import {StyleSheet, Text, View, ToastAndroid, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsDarkController} from '../../store/store';
import {useWalletConnectModal} from '@walletconnect/modal-react-native';
import ProfileLoading from '../../components/Skeletons/ProfileLoading';
import ProfileTab from '../../components/ProfileTab';
import LinearGradient from 'react-native-linear-gradient';
import TrasnactionHistory from '../../components/Skeletons/TrasnactionHistory';
import {FindUser, StoreUser} from '../../db/ProfileController';

const Profile = () => {
  const userData = FindUser().then((data: any) => {
    JSON.parse(data);
  });
  const isDark = useIsDarkController(state => state.isDark);
  const [profile, setProfile] = useState<Profile>();
  const {address} = useWalletConnectModal();
  useEffect(() => {
    (async () => {
      const serverEndPoint = 'https://usermanagementbrics.onrender.com/api';
      await fetch(`${serverEndPoint}/users/${address}`)
        .then(data => data.json())
        .then((data: any) => {
          setProfile(data.users);
          StoreUser(data.users);
        })
        .catch(err =>
          ToastAndroid.showWithGravity(
            err.message || err,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
          ),
        );
    })();
  }, [address]);
  console.log(profile && new Date(profile?.createdAt).toUTCString());
  return (
    <View
      style={{
        backgroundColor: !isDark ? 'white' : 'rgb(31 41 55)',
        minHeight: '100%',
      }}>
      <View>
        {!profile ? (
          <ProfileLoading />
        ) : (
          <View>
            <ProfileTab
              name={profile?.name}
              wallet_address={profile?.wallet_address}
              createdAt={profile?.createdAt}
              email={profile.email}
            />
          </View>
        )}
      </View>
      <LinearGradient
        colors={
          !isDark
            ? ['white', 'rgb(220 252 231)']
            : ['rgb(31 41 55)', 'rgb(5 46 22)']
        }
        start={{x: 0.5, y: 0.8}}
        end={{x: 0.5, y: 0}}
        style={{
          flex: 1,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          marginTop: 20,
        }}>
        <Text
          style={{
            color: !isDark ? 'rgb(17 24 39)' : 'rgb(249 250 251)',
            margin: 10,
            textAlign: 'center',
            fontSize: 17,
          }}>
          Transaction History
        </Text>
        <ScrollView>
          <TrasnactionHistory />
          {/* <Text style={{textAlign: 'center', marginTop: 40, fontSize: 20}}>
            No transactions found
          </Text> */}
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
