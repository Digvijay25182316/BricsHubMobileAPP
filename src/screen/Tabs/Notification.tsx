import {StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsDarkController} from '../../store/store';
import NotificationSkeleton from '../../components/Skeletons/NotificationSkeleton';
import {useWalletConnectModal} from '@walletconnect/modal-react-native';
import FlatListNoficiation from '../../components/FlatListNoficiation';

const Notifications = () => {
  const isDark = useIsDarkController(state => state.isDark);
  const [notifications, setNotifications] = useState<notification[]>();
  const {address} = useWalletConnectModal();
  useEffect(() => {
    (async () => {
      const serverEndPoint = 'https://usermanagementbrics.onrender.com/api';
      await fetch(`${serverEndPoint}/getnotifications/${address}`)
        .then(data => data.json())
        .then((data: any) => setNotifications(data?.users?.notifications))
        .catch(err =>
          ToastAndroid.showWithGravity(
            err.message || err,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
          ),
        );
    })();
  }, [address]);
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: !isDark ? 'white' : 'rgb(31 41 55)'},
      ]}>
      <View>
        {notifications ? (
          notifications.length === 0 ? (
            <Text style={{color: !isDark ? 'rgb(31 41 55)' : 'white'}}>
              You dont have any notification
            </Text>
          ) : (
            <FlatListNoficiation notification={notifications} />
          )
        ) : (
          <NotificationSkeleton />
        )}
      </View>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    backgroundColor: 'black',
  },
});
