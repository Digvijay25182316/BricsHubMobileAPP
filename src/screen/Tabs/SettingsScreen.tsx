import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  useWalletConnectModal,
  WalletConnectModal,
} from '@walletconnect/modal-react-native';

const SettingsScreen = () => {
  const {isConnected, provider, open} = useWalletConnectModal();
  return (
    <View>
      <Text>SettingsScreen</Text>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
