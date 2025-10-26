import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';
import React, {ReactNode, useEffect} from 'react';
import PushNotification, {Importance} from 'react-native-push-notification';
import initializeNotifications from './initializeNotifications';

interface Props {
  children?: ReactNode;
}

export const FCMProvider: React.FC<Props> = ({children}) => {
  const navigation = useNavigation();

  useEffect(() => {
    initializeNotifications();
    setupBackgroundMessageHandler();
    configurePushNotification();
    const unsubscribeForeground = setupForegroundMessageListener();

    // Cleanup function - unsubscribe from foreground listener when component unmounts
    return () => {
      if (unsubscribeForeground) {
        unsubscribeForeground();
      }
    };
  }, []);

  const setupBackgroundMessageHandler = () => {
    // setBackgroundMessageHandler doesn't return unsubscribe
    // It's a one-time setup for background messages
    messaging().setBackgroundMessageHandler(
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        console.log('Background message received:', remoteMessage);

        const channelId = String(
          remoteMessage?.data?.android_channel_id || 'default-channel',
        );
        const channelName = String(
          remoteMessage?.data?.channel_name || 'Notifications',
        );

        // Create channel with notification settings
        PushNotification.createChannel(
          {
            channelId,
            channelName,
            playSound: true,
            soundName: 'default',
            vibrate: true,
            importance: Importance.HIGH,
          },
          () => {},
        );

        // Show local notification
        PushNotification.localNotification({
          channelId,
          title: String(
            remoteMessage?.data?.title ??
              remoteMessage?.notification?.title ??
              'Notification',
          ),
          message: String(
            remoteMessage?.data?.body ??
              remoteMessage?.notification?.body ??
              '',
          ),
          largeIcon: 'ic_launcher',
          smallIcon: 'ic_launcher',
          playSound: true,
          vibrate: true,
        });
      },
    );
  };

  const setupForegroundMessageListener = () => {
    // onMessage returns an unsubscribe function
    return messaging().onMessage(
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        console.log('Foreground message received:', remoteMessage);

        const channelId = String(
          remoteMessage?.data?.android_channel_id || 'default-channel',
        );
        const channelName = String(
          remoteMessage?.data?.channel_name || 'Notifications',
        );

        // Create channel with notification settings
        PushNotification.createChannel(
          {
            channelId,
            channelName,
            playSound: true,
            soundName: 'default',
            vibrate: true,
            importance: Importance.DEFAULT,
          },
          () => {},
        );

        // Show local notification
        PushNotification.localNotification({
          channelId,
          title: String(
            remoteMessage?.data?.title ??
              remoteMessage?.notification?.title ??
              'Notification',
          ),
          message: String(
            remoteMessage?.data?.body ??
              remoteMessage?.notification?.body ??
              '',
          ),
          largeIcon: 'ic_launcher',
          smallIcon: 'ic_launcher',
          playSound: true,
          vibrate: true,
        });
      },
    );
  };

  const configurePushNotification = () => {
    PushNotification.configure({
      onNotification: notification => {
        console.log('Notification tapped:', notification);
        if (notification.foreground) {
          navigation.navigate('HomeTab', {
            screen: 'ProductDetailScreen',
          });
        } else {
          navigation.navigate('CartTab');
        }
      },
    });
  };

  return <>{children}</>;
};

export default FCMProvider;
