import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  useWalletConnectModal,
  WalletConnectModal,
} from '@walletconnect/modal-react-native';
import {ethers} from 'ethers';
import {Web3Provider} from '@ethersproject/providers';
import ConfigUtils from '../../utils/ConfigUtils';
import {RequestModal} from '../RequestModal';
import Clipboard from '@react-native-clipboard/clipboard';
import {Link, useNavigation} from '@react-navigation/native';
import {useClient} from '../../store/store';

const HomeHeader = () => {
  const [client, setClient] = useState<Web3Provider>();
  const clientStore = useClient(state => state.StoreClient);
  const [modalVisible, setModalVisible] = useState(false);
  const [rpcResponse, setRpcResponse] = useState<any>();
  const [loading, setLoading] = useState(false);
  const {isConnected, provider, open} = useWalletConnectModal();
  useEffect(() => {
    if (isConnected && provider) {
      const _client = new ethers.providers.Web3Provider(provider);
      setClient(_client);
      clientStore(_client);
    }
  }, [isConnected, provider]);

  const onConnect = () => {
    if (isConnected) {
      return provider?.disconnect();
    }
    return open();
  };
  const onModalClose = () => {
    setModalVisible(false);
    setLoading(false);
    setRpcResponse(undefined);
  };

  const onCopy = (value: string) => {
    Clipboard.setString(value);
  };

  const onResponse = (response: any) => {
    setRpcResponse(response);
    setLoading(false);
  };
  const navigatestring: string = 'notification'; //fot typos errors in navigation.navigate
  return (
    <View style={styles.container}>
      <Text style={styles.Logo}>BricsHub</Text>
      <View style={styles.leftHeader}>
        <TouchableOpacity
          style={styles.connectWalletButton}
          onPress={onConnect}>
          <Text style={styles.connectWalletText}>
            {!isConnected ? 'Connect Wallet' : 'Disconnect'}
          </Text>
        </TouchableOpacity>
        <Link to={'/notifications'}>
          <View style={styles.NotificationIcon}>
            <FontAwesome name="bell-o" size={24} color="rgb(156 163 175)" />
            <Text style={styles.NotificationNumber}>{''}</Text>
          </View>
        </Link>
      </View>

      <WalletConnectModal
        projectId={'a724fd6f434dcc64058405875ea4a634'}
        providerMetadata={ConfigUtils.providerMetadata}
        sessionParams={ConfigUtils.sessionParams}
        onCopyClipboard={onCopy}
      />
      <RequestModal
        isVisible={modalVisible}
        onClose={onModalClose}
        isLoading={loading}
        rpcResponse={rpcResponse}
      />
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    elevation: 5,
    backgroundColor: 'white',
    minHeight: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  Logo: {
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  connectWalletButton: {
    backgroundColor: 'rgb(34 197 94)',
    maxWidth: 160,
    padding: 10,
    elevation: 10,
    borderRadius: 10,
  },
  connectWalletText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 17,
  },
  NotificationIcon: {
    position: 'relative',
  },
  NotificationNumber: {
    position: 'absolute',
    height: 10,
    width: 10,
    backgroundColor: 'red',
    top: 0,
    right: 3,
    borderRadius: 100,
  },
});
