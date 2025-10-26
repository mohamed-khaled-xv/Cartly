# Firebase Cloud Messaging (FCM) Notifications Workflow

## Overview

This guide explains how the `useNotifications` hook works to receive push notifications from Firebase Cloud Messaging.

## Architecture Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      App Startup (App.tsx)                      │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
        ┌────────────────────────────────────────────┐
        │   useNotifications() hook is called        │
        │   (runs in useEffect on mount)             │
        └────────────────┬─────────────────────────┘
                         │
                         ▼
        ┌────────────────────────────────────────────┐
        │  1. CHECK PERMISSION STATUS                │
        │     checkNotifications()                   │
        └────────────────┬─────────────────────────┘
                         │
        ┌────────────────┴───────────────────┐
        │                                    │
        ▼                                    ▼
   Permission                          Permission
   Granted/Limited                      Denied/Blocked
        │                                    │
        ▼                                    ▼
   GET FCM TOKEN                    REQUEST PERMISSION
   getFCMToken()                    requestPermission()
        │                                    │
        ▼                                    ▼
   ┌─────────────────────┐         ┌──────────────────┐
   │ Token Obtained ✓    │         │ User Responds    │
   │ Stored in State     │         │ (allows/denies)  │
   └─────────────────────┘         └────────┬─────────┘
                                            │
                                 ┌──────────┴──────────┐
                                 │                    │
                                 ▼                    ▼
                            Granted          Blocked/Denied
                                 │                    │
                                 ▼                    ▼
                            GET TOKEN            Alert User
                                 │                    │
                                 └────────┬───────────┘
                                          │
                                          ▼
                        ┌──────────────────────────────────┐
                        │  FCM Token Ready                 │
                        │  Send to Backend                 │
                        │  (save for push notifications)   │
                        └──────────────────────────────────┘
```

## Step-by-Step Workflow

### Step 1: App Initialization

When your app starts in `App.tsx`, the `useNotifications()` hook is called:

```tsx
// App.tsx
useNotifications();
```

### Step 2: Permission Check

The hook calls `checkNotifications()` to see if the user has already granted notification permissions:

```typescript
// Possible statuses:
// - 'granted': User has allowed notifications
// - 'limited': iOS only - limited permission
// - 'denied': User hasn't been asked yet
// - 'blocked': User denied and can't ask again
// - 'unavailable': Device doesn't support notifications
```

### Step 3: If Permission Already Granted

If the user previously allowed notifications:

- Skip the permission request
- Call `getFCMToken()` immediately
- FCM token is generated and stored

### Step 4: If Permission Not Granted

If the user hasn't been asked yet:

- Call `requestPermission()`
- Show native OS permission dialog
- User can allow or deny

### Step 5: Get FCM Token

Once permission is granted/limited:

- Firebase generates a unique FCM token
- Token is stored in state (`fcmToken`)
- Token is logged to console for debugging

```typescript
// Example FCM Token:
// "d8VxJ4_xRSKzq9... (64+ character string)"
```

### Step 6: Send Token to Backend

**This is the critical step** - you need to:

1. Send this FCM token to your backend server
2. Store it in a database associated with the user
3. Backend uses this token to send push notifications

## Hook Return Values

```typescript
const {
  fcmToken, // The actual FCM token (string or null)
  permissionStatus, // Current permission status (string or null)
  checkPermissionStatus, // Function to re-check permissions
  requestPermission, // Function to request permissions manually
  getFCMToken, // Function to get/refresh token
  initializeNotifications, // Function to reinitialize
} = useNotifications();
```

## How Notifications Are Received

### Foreground (App Open)

When the app is open and a notification is sent:

```typescript
// In messaging().onMessage() listener
messaging().onMessage(async remoteMessage => {
  console.log('Notification received while app is open:', remoteMessage);
  // Show in-app notification/alert
});
```

### Background (App Closed/Minimized)

When the app is closed/minimized and a notification is sent:

- Firebase shows system notification automatically
- User taps → App opens via deep linking

```typescript
// In messaging().onNotificationOpenedApp() listener
messaging().onNotificationOpenedApp(remoteMessage => {
  console.log('User tapped notification:', remoteMessage);
  // Navigate to specific screen
});
```

### Quit State (App Killed)

When the app was completely killed and user taps a notification:

```typescript
// Check if app was opened from notification
const initialNotification = await messaging().getInitialNotification();
if (initialNotification) {
  console.log('App opened from killed state:', initialNotification);
  // Handle navigation
}
```

## Complete Usage Example

### 1. Get the Token in Your Screen

```tsx
import {useNotifications} from '@hooks/useNotifications';

const HomeScreen = () => {
  const {fcmToken} = useNotifications();

  useEffect(() => {
    if (fcmToken) {
      console.log('Ready to receive notifications:', fcmToken);
      // Send token to your backend API
      saveFCMTokenToBackend(fcmToken);
    }
  }, [fcmToken]);

  return <View>...</View>;
};
```

### 2. Backend Integration (Example)

```typescript
// In your backend API service
const saveFCMTokenToBackend = async (token: string) => {
  try {
    await apiClient.post('/users/fcm-token', {
      token,
      userId: currentUser.id,
      platform: Platform.OS, // 'ios' or 'android'
    });
    console.log('FCM token saved to backend');
  } catch (error) {
    console.error('Failed to save token:', error);
  }
};
```

### 3. Set Up Message Listeners (Optional)

Add these listeners in your app initialization to handle incoming messages:

```typescript
// In App.tsx or RootNavigator.tsx
import messaging from '@react-native-firebase/messaging';
import {useEffect} from 'react';

useEffect(() => {
  // Foreground message handler
  const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
    console.log('Foreground message received:', remoteMessage);
    // Show in-app notification
  });

  // Background message handler (sent to background notification handler)
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('Notification opened from background:', remoteMessage);
    // Handle navigation based on notification data
  });

  // App killed state
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('Notification opened from killed state:', remoteMessage);
      }
    });

  return () => {
    unsubscribeForeground();
  };
}, []);
```

## Permission Status Reference

| Status        | Meaning                      | Action                           |
| ------------- | ---------------------------- | -------------------------------- |
| `granted`     | User allowed notifications   | ✅ Get FCM token                 |
| `limited`     | iOS - limited permission     | ✅ Get FCM token (partial)       |
| `denied`      | User hasn't been asked       | 🔄 Request permission            |
| `blocked`     | User denied, can't ask again | ⚠️ Show alert with settings link |
| `unavailable` | Device doesn't support       | ❌ Skip notifications            |
| `null`        | Error checking permission    | ⚠️ Log error, retry              |

## Firebase Console Setup

To send notifications from Firebase Console:

1. Go to Firebase Console → Your Project → Cloud Messaging
2. Create a new campaign
3. Select your app (iOS/Android)
4. Write notification title & body
5. Target: Select "Device tokens" → Paste the FCM token
6. Send!

The notification will appear on the user's device automatically.

## Troubleshooting

### "FCM Token is null"

- ✅ Check if permission was granted
- ✅ Check console logs for errors
- ✅ Make sure Firebase is properly initialized
- ✅ Restart the app

### "Notifications not appearing"

- ✅ Verify FCM token was sent to backend
- ✅ Check if using correct token in Firebase Console
- ✅ Check device notification settings
- ✅ Check Firebase Cloud Messaging API is enabled in Console

### "Permission dialog not showing"

- ✅ Check if permission was already granted/blocked
- ✅ Try resetting app or clearing app data
- ✅ Check react-native-permissions is correctly linked

## Summary

**The complete flow:**

1. App starts → Hook initializes
2. Check permission status
3. Request permission if needed
4. Get FCM token (if granted)
5. Send token to backend
6. Backend stores token for this user
7. Backend sends notification using token
8. User receives notification
9. User taps notification → App handles it

**That's it!** The user will now receive push notifications from your Firebase backend.
