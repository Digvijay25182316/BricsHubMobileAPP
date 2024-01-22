import {StyleSheet, Text, View, Appearance, Pressable} from 'react-native';
import React, {useEffect} from 'react';
import {useWalletConnectModal} from '@walletconnect/modal-react-native';
import {Link} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OtherHeaders from '../components/Headers/OtherHeaders';
import {useIsDarkController} from '../store/store';

const SettingsScreen = () => {
  const {isConnected, provider, open} = useWalletConnectModal();
  const setIsDark = useIsDarkController(state => state.setIsDark);
  const isDark = useIsDarkController(state => state.isDark);
  const setColorScheme = Appearance.setColorScheme;

  return (
    <View style={!isDark ? styles.containerLight : styles.containerDark}>
      <OtherHeaders />
      <View style={{marginTop: 24}}>
        <Link
          to={'/accountSection'}
          style={{
            backgroundColor: !isDark ? 'rgb(229 231 235)' : 'rgb(75 85 99)',
            borderRadius: 10,
            margin: 10,
            paddingHorizontal: 5,
            paddingVertical: 15,
          }}>
          <View
            style={{
              flexDirection: 'row',
              gap: 20,
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              name="account"
              size={24}
              color={!isDark ? 'white' : 'rgb(21 128 61)'}
              style={{
                backgroundColor: 'rgb(55 65 81)',
                padding: 15,
                borderRadius: 100,
                elevation: 2,
              }}
            />
            <Text style={{fontSize: 18, color: !isDark ? 'black' : 'white'}}>
              Account Section
            </Text>
          </View>
        </Link>
        <View
          style={{
            backgroundColor: !isDark ? 'rgb(229 231 235)' : 'rgb(75 85 99)',
            margin: 10,
            paddingVertical: 10,
            paddingHorizontal: 5,
            borderRadius: 10,
          }}>
          <Pressable
            onPress={() => {
              setIsDark(!isDark),
                setColorScheme(
                  Appearance.getColorScheme() === 'light' ? 'dark' : 'light',
                );
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 10,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
              <MaterialCommunityIcons
                name="theme-light-dark"
                size={30}
                color={!isDark ? 'white' : 'rgb(21 128 61)'}
                style={{
                  backgroundColor: 'rgb(55 65 81)',
                  padding: 12,
                  borderRadius: 100,
                  elevation: 2,
                }}
              />
              <Text style={{fontSize: 18, color: !isDark ? 'black' : 'white'}}>
                Dark Mode
              </Text>
            </View>
            <View>
              {!isDark ? (
                <FontAwesome
                  name="toggle-off"
                  size={38}
                  color="rgb(22 163 74)"
                />
              ) : (
                <FontAwesome
                  name="toggle-on"
                  size={38}
                  color="rgb(22 163 74)"
                />
              )}
            </View>
          </Pressable>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Pressable
            onPress={() => provider?.disconnect()}
            style={{
              flexDirection: 'row',
              gap: 20,
              alignItems: 'center',
              backgroundColor: !isDark ? 'rgb(202 138 4)' : 'rgb(133 77 14)',
              borderRadius: 100,
              margin: 10,
              paddingRight: 20,
            }}>
            <Ionicons
              name="wallet-outline"
              size={26}
              color={!isDark ? 'white' : 'rgb(21 128 61)'}
              style={{
                backgroundColor: 'rgb(55 65 81)',
                padding: 15,
                borderRadius: 100,
                elevation: 2,
              }}
            />
            <Text style={{fontSize: 18, color: !isDark ? 'black' : 'white'}}>
              Disconnect Wallet
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  containerLight: {
    backgroundColor: 'white',
    minHeight: '100%',
    minW: '100%',
  },
  containerDark: {
    backgroundColor: 'rgb(31 41 55)',
    minHeight: '100%',
  },
});
