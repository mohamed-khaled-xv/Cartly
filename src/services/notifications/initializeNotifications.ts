import messaging from '@react-native-firebase/messaging';
import usePermissions from '@hooks/usePermissions';

const getFCMToken = async () => {
  try {
    const fcmToken = await messaging().getToken();
    console.log('FCM Token:', fcmToken);
  } catch (error) {
    console.error('Error fetching FCM token:', error);
  }
}


const initializeNotifications = async () => {
  const {requestNotificationPermission} = usePermissions();
  const status = await requestNotificationPermission();
  if (status === 'granted' || status === 'limited') {
    await getFCMToken();
  }
};


export default initializeNotifications;
