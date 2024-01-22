import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import Octicons from 'react-native-vector-icons/Octicons';
import {
  useWalletConnectModal,
  WalletConnectModal,
} from '@walletconnect/modal-react-native';
import {ethers} from 'ethers';
import ConfigUtils from '../../utils/ConfigUtils';
import {RequestModal} from '../../components/RequestModal';
import {useClient} from '../../store/store';
import FastImage from 'react-native-fast-image';

const AuthScreen = () => {
  const clientStore = useClient(state => state.StoreClient);
  const [modalVisible, setModalVisible] = useState(false);
  const [rpcResponse, setRpcResponse] = useState<any>();
  const [loading, setLoading] = useState(false);
  const {isConnected, provider, open} = useWalletConnectModal();
  const navigation: any = useNavigation();
  useEffect(() => {
    if (isConnected && provider) {
      const _client = new ethers.providers.Web3Provider(provider);
      clientStore(_client);
      navigation.navigate('profile');
    }
  }, [isConnected, provider]);

  const onModalClose = () => {
    setModalVisible(false);
    setLoading(false);
    setRpcResponse(undefined);
  };
  const onConnect = () => {
    if (isConnected) {
      ToastAndroid.showWithGravity(
        'Connected your wallet successfully',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
      return provider?.disconnect();
    }
    return open();
  };

  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.blockchainConnectPhoto}>
        <Text style={{fontSize: 30, color: 'rgb(251 146 60)'}}>BricsHub</Text>
        <View style={{transform: [{rotateZ: '90deg'}]}}>
          <Octicons name="arrow-switch" size={34} color="green" />
        </View>
        <FastImage
          style={{width: 100, height: 100}}
          source={{
            uri: 'https://res.cloudinary.com/dko1ffxgt/image/upload/v1700817455/6jf2um3c4r9nu3mbtumg368rge_mizeyq.png',
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <View style={styles.connectWalletReasonT}>
        <Text style={styles.connectWalletReasonText}>
          By connecting wallet you will LogIn and get the access
        </Text>
      </View>
      <TouchableOpacity
        style={styles.ConnectWalletButton}
        onPress={() => onConnect()}>
        <Ionicons
          name="wallet-outline"
          size={32}
          color="rgb(21 128 61)"
          style={{
            backgroundColor: 'rgb(55 65 81)',
            padding: 15,
            borderRadius: 100,
            elevation: 10,
          }}
        />
        <Text style={styles.ConnectWalletText}>Connect Wallet</Text>
      </TouchableOpacity>
      <WalletConnectModal
        projectId={'a724fd6f434dcc64058405875ea4a634'}
        providerMetadata={ConfigUtils.providerMetadata}
        sessionParams={ConfigUtils.sessionParams}
      />
      <RequestModal
        isVisible={modalVisible}
        onClose={onModalClose}
        isLoading={loading}
        rpcResponse={rpcResponse}
      />
    </SafeAreaView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  Container: {
    minHeight: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
    backgroundColor: 'rgb(31 41 55)',
  },
  blockchainConnectPhoto: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    gap: 20,
    backgroundColor: 'rgb(31 41 55)',
    margin: 20,
    borderRadius: 20,
    padding: 20,
  },
  ConnectWalletButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(21 128 61)',
    paddingRight: 15,
    gap: 10,
    borderRadius: 40,
    elevation: 10,
    marginBottom: 30,
  },
  ConnectWalletText: {
    color: 'white',
    fontSize: 25,
  },
  connectWalletReasonT: {
    backgroundColor: 'rgb(55 65 81)',
    flexDirection: 'column',
    gap: 10,
    padding: 20,
    marginBottom: 30,
    fontSize: 20,
    borderRadius: 20,
    margin: 10,
    elevation: 5,
  },
  connectWalletReasonText: {
    color: 'rgb(229 231 235)',
    textAlign: 'center',
    fontSize: 20,
  },
});
