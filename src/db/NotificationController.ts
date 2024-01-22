import AsyncStorage from '@react-native-async-storage/async-storage';
import {ToastAndroid} from 'react-native';

export const getNotifications = async () => {
  try {
    const notifications = await AsyncStorage.getItem('notifications');
    return notifications;
  } catch (error: any) {
    ToastAndroid.showWithGravity(
      error.message || error,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
    );
  }
};

export const setNotifications = async ({
  notifications,
}: {
  notifications: notification[];
}) => {
  try {
    await AsyncStorage.setItem('notifications', JSON.stringify(notifications));
  } catch (error) {}
};

export const DeleteNotifications = async () => {
  try {
    await AsyncStorage.removeItem('notifications');
    ToastAndroid.showWithGravity(
      'deleted all notifications',
      ToastAndroid.BOTTOM,
      ToastAndroid.SHORT,
    );
  } catch (error: any) {
    ToastAndroid.showWithGravity(
      error.message || error,
      ToastAndroid.BOTTOM,
      ToastAndroid.LONG,
    );
  }
};
