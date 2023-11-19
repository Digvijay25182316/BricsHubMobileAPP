import React, {useState} from 'react';
import {useClient} from '../../store/store';
import {
  SafeAreaView,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  useWalletConnectModal,
  WalletConnectModal,
} from '@walletconnect/modal-react-native';
import Clipboard from '@react-native-clipboard/clipboard';

import {numberToHex, sanitizeHex} from '@walletconnect/encoding';
import {ethers} from 'ethers';
import {Web3Provider} from '@ethersproject/providers';

import ContractUtils from '../../utils/ContractUtils';
import ConfigUtils from '../../utils/ConfigUtils';
import {RequestModal} from '../../components/RequestModal';

const HomeScreen = () => {
  const client = useClient(state => state.client);
  const [response, setResponse] = useState<Audit[]>([]);

  const onReadContract = async () => {
    const contract = new ethers.Contract(
      ContractUtils.contractAddress,
      ContractUtils.goerliABI,
      client,
    );

    // Read contract information
    const totalSupply = await contract.retrieve();
    const responseArr: Audit[] = [];
    totalSupply.map((response: any) => {
      responseArr.push({
        projectID: response[1],
        plotID: response[2],
        latitude: response[3],
        longitude: response[4],
        AuditID: response[5],
      });
    });
    setResponse(responseArr);
    return {
      method: 'read contract',
      data: totalSupply,
    };
  };

  return (
    <View>
      <Text>HomeScreen</Text>
      <TouchableOpacity onPress={onReadContract} style={styles.onReadButton}>
        <Text style={{color: 'white'}}>OnRead</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  onReadButton: {
    backgroundColor: 'gray',
    maxWidth: 90,
    padding: 10,
    borderRadius: 20,
    elevation: 2,
  },
});
