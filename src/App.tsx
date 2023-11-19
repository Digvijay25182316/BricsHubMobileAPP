import './config/polyfills';
import React, {useEffect, useState} from 'react';
import {Modal, SafeAreaView, StyleSheet} from 'react-native';

import {
  useWalletConnectModal,
  WalletConnectModal,
} from '@walletconnect/modal-react-native';
import Clipboard from '@react-native-clipboard/clipboard';

import {numberToHex, sanitizeHex} from '@walletconnect/encoding';
import {ethers} from 'ethers';
import {Web3Provider} from '@ethersproject/providers';

import ContractUtils from './utils/ContractUtils';
import ConfigUtils from './utils/ConfigUtils';
import {RequestModal} from './components/RequestModal';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screen/Home';
import Notifications from './screen/Notification';
import {NavigationContainer} from '@react-navigation/native';
import OtherHeaders from './components/Headers/OtherHeaders';

function App(): JSX.Element {
  const {isConnected, provider, open} = useWalletConnectModal();
  const [client, setClient] = useState<Web3Provider>();
  const [modalVisible, setModalVisible] = useState(false);
  const [rpcResponse, setRpcResponse] = useState<any>();
  const [loading, setLoading] = useState(false);

  // Init ethers client when the wallet is connected
  useEffect(() => {
    if (isConnected && provider) {
      const _client = new ethers.providers.Web3Provider(provider);

      setClient(_client);
    }
  }, [isConnected, provider]);

  const onConnect = () => {
    if (isConnected) {
      return provider?.disconnect();
    }
    return open();
  };

  const onCopy = (value: string) => {
    Clipboard.setString(value);
  };

  const onResponse = (response: any) => {
    setRpcResponse(response);
    setLoading(false);
  };

  const onModalClose = () => {
    setModalVisible(false);
    setLoading(false);
    setRpcResponse(undefined);
  };

  const onAction = (callback: any) => async () => {
    try {
      setLoading(true);
      setModalVisible(true);
      const response = await callback();
      onResponse(response);
    } catch (error: any) {
      onResponse({
        error: error?.message || 'error',
      });
    }
  };

  const onSendTransaction = async () => {
    if (!client) {
      return;
    }

    const signer = client.getSigner();

    const {chainId} = await client.getNetwork();

    const amount = sanitizeHex(numberToHex(0.0001));
    const transaction = {
      to: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', // vitalik.eth
      value: amount,
      chainId,
    };

    // Send the transaction using the signer
    const txResponse = await signer.sendTransaction(transaction);
    const transactionHash = txResponse.hash;
    console.log('transactionHash is ' + transactionHash);

    // Wait for the transaction to be mined (optional)
    const receipt = await txResponse.wait();
    console.log('Transaction was mined in block:', receipt.blockNumber);

    return {
      method: 'send transaction',
      blockNumber: receipt.blockNumber,
      result: transactionHash,
    };
  };

  const onSignMessage = async () => {
    if (!client) {
      return;
    }

    const [address] = await client.listAccounts();
    const signer = client.getSigner(address);

    const signature = await signer?.signMessage('Hello World!');
    return {
      method: 'sign message',
      signature: signature,
    };
  };

  const onReadContract = async () => {
    const contract = new ethers.Contract(
      ContractUtils.contractAddress,
      ContractUtils.goerliABI,
      client,
    );

    // Read contract information
    const totalSupply = await contract.retrieve();
    console.log(ethers.utils.formatEther(totalSupply));

    return {
      method: 'read contract',
      data: totalSupply,
    };
  };

  const onWriteContract = async () => {
    if (!client) {
      return;
    }

    const [address] = await client.listAccounts();
    const signer = client.getSigner(address);

    const contract = new ethers.Contract(
      ContractUtils.contractAddress,
      ContractUtils.goerliABI,
      signer,
    );

    const receipt = await contract.store(123);
    const hash = receipt.hash;
    console.log('receipt', receipt);
    return {
      method: 'write contract',
      response: hash,
    };
  };
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="nome" component={Home} />
        <Stack.Screen name="notifications" component={Notifications} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3396FF',
    borderRadius: 20,
    width: 200,
    height: 50,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    marginTop: 4,
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
  },
  inputText: {
    backgroundColor: 'gray',
  },
});

export default App;
