import AsyncStorage from '@react-native-async-storage/async-storage';
import {ToastAndroid} from 'react-native';

export const StoreUser = async ({
  name,
  email,
  wallet_address,
  createdAt,
}: Profile) => {
  try {
    await AsyncStorage.setItem(
      'user',
      JSON.stringify({name, email, wallet_address, createdAt}),
    );
  } catch (error: any) {
    ToastAndroid.showWithGravity(
      error.message || error,
      ToastAndroid.BOTTOM,
      ToastAndroid.LONG,
    );
  }
};

export const FindUser = async () => {
  try {
    const User = await AsyncStorage.getItem('user');
    return User;
  } catch (error: any) {
    ToastAndroid.showWithGravity(
      error.message || error,
      ToastAndroid.BOTTOM,
      ToastAndroid.LONG,
    );
  }
};

export const UpdateUser = async ({
  name,
  email,
  wallet_address,
  createdAt,
}: Profile) => {
  try {
    await AsyncStorage.setItem(
      'user',
      JSON.stringify({name, email, wallet_address, createdAt}),
    );
  } catch (error: any) {
    ToastAndroid.showWithGravity(
      error.message || error,
      ToastAndroid.BOTTOM,
      ToastAndroid.LONG,
    );
  }
};

export const deleteUser = async () => {
  try {
    await AsyncStorage.removeItem('user');
  } catch (error: any) {
    ToastAndroid.showWithGravity(
      error.message || error,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
    );
  }
};
