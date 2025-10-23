/**
 * Requests notification permissions from the user
 */

import {Alert} from 'react-native';
import {requestNotifications, openSettings} from 'react-native-permissions';

const usePermissions = () => {
  const requestNotificationPermission = async () => {
    try {
      const {status} = await requestNotifications(['alert', 'sound', 'badge']);

      if (status === 'granted' || status === 'limited') {
        console.log('Notification permission granted:', status);
      } else if (status === 'blocked') {
        Alert.alert(
          'Notifications Blocked',
          'Notifications are blocked. Please enable them in settings to receive updates.',
          [
            {text: 'Cancel', style: 'cancel'},
            {
              text: 'Open Settings',
              onPress: () => openSettings('notifications'),
            },
          ],
        );
      } else if (status === 'denied') {
        Alert.alert(
          'Permission Denied',
          'You denied notification permissions. Please enable them in settings.',
        );
      }
      return status;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return null;
    }
  };
  return {requestNotificationPermission};
};

export default usePermissions
