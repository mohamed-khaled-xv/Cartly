/**
 * @format
 */

import messaging from '@react-native-firebase/messaging';
import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import {Notifications} from 'react-native-notifications';
import {name as appName} from './app.json';
import App from './src/App';

console.log('📱 index.js loading...');

// ============================================
// STEP 1: FIREBASE BACKGROUND HANDLER (Required!)
// ============================================
// This MUST be registered BEFORE AppRegistry.registerComponent
// Handles messages when app is in background/quit state
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('🔥 Firebase background message received:', remoteMessage);

  // Firebase will automatically display the notification in background
  // This handler is just for processing custom data if needed
  if (remoteMessage.data) {
    console.log('📦 Background message data:', remoteMessage.data);
  }
});

console.log('✅ Firebase background handler registered');

// ============================================
// STEP 2: FIREBASE FOREGROUND HANDLER
// ============================================
// Handles messages when app is in foreground
// Must manually display notification since Firebase doesn't auto-show in foreground
messaging().onMessage(async remoteMessage => {
  console.log('� Firebase foreground message received:', remoteMessage);

  if (remoteMessage.notification) {
    const {title, body} = remoteMessage.notification;

    console.log('📤 Displaying as local notification:', {title, body});

    // Post as local notification to show banner in foreground
    Notifications.postLocalNotification({
      body: body || 'New message',
      title: title || 'Notification',
      sound: 'default',
      android: {
        channelId: 'high-priority-channel',
        smallIcon: 'ic_notification',
        priority: 'max',
        importance: 'high',
        sound: true,
        vibrate: true,
        autoCancel: true,
      },
    });

    console.log('✅ Local notification posted');
  }

  if (remoteMessage.data) {
    console.log('📦 Foreground message data:', remoteMessage.data);
  }
});

console.log('✅ Firebase foreground handler registered');

// ============================================
// STEP 3: REGISTER FOR REMOTE NOTIFICATIONS
// ============================================
// Now that handlers are ready, ask OS to register for push
Notifications.registerRemoteNotifications();

console.log('✅ Requested remote notification registration');

// ============================================
// STEP 4: NOTIFICATION EVENTS
// ============================================

// Device token received (FCM token on Android, APNs token on iOS)
Notifications.events().registerRemoteNotificationsRegistered(event => {
  console.log('📱 Device registered for push notifications:', event);
});

// Registration failed
Notifications.events().registerRemoteNotificationsRegistrationFailed(event => {
  console.warn('❌ Push registration failed:', event);
});

// User tapped a notification (works for both foreground and background)
Notifications.events().registerNotificationOpened(
  (notification, completion) => {
    console.log('👆 Notification tapped:', notification.payload);
    const data = notification.payload?.data || notification.payload?.userInfo;
    // TODO: navigate based on data (screen/id)
    completion();
  },
);

// Check if app was launched from a notification (cold start)
Notifications.getInitialNotification().then(notification => {
  if (notification) {
    console.log('🚀 App launched from notification:', notification.payload);
    const data = notification.payload?.data || notification.payload?.userInfo;
    // TODO: stash data to navigate after first render
  }
});

console.log('✅ All notification listeners registered');

// ============================================
// STEP 5: REGISTER APP COMPONENT
// ============================================
AppRegistry.registerComponent(appName, () => App);
