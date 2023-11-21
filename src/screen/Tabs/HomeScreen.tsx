import React, {useState} from 'react';
import {useClient} from '../../store/store';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
import {ethers} from 'ethers';
import {
  useWalletConnectModal,
  WalletConnectModal,
} from '@walletconnect/modal-react-native';
import ContractUtils from '../../utils/ContractUtils';

const HomeScreen = () => {
  const client = useClient(state => state.client);
  const [response, setResponse] = useState<Audit[]>([]);
  const {isConnected, provider, open} = useWalletConnectModal();

  const onReadContract = async () => {
    if (!isConnected) {
      return;
    }
    try {
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
          projectID: response[0],
          plotID: response[1],
          latitude: response[2],
          longitude: response[3],
          AuditID: response[4],
        });
      });
      setResponse(responseArr);
      return {
        method: 'read contract',
        data: totalSupply,
      };
    } catch (error: any) {
      console.log(error.message || error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={onReadContract} style={styles.onReadButton}>
        <Text style={{color: 'black', textAlign: 'center'}}>OnRead</Text>
      </TouchableOpacity>
      <View style={styles.dataCardContainer}>
        {response?.map((audit: any, index: any) => (
          <View key={index} style={styles.dataCard}>
            <Text>{audit.projectID}</Text>
            <Text>{audit.plotIDwe}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  onReadButton: {
    backgroundColor: 'rgb(229 231 235)',
    maxWidth: 90,
    padding: 10,
    borderRadius: 5,
    elevation: 10,
    marginBottom: 20,
  },
  dataCardContainer: {
    flexDirection: 'column',
    gap: 15,
  },
  dataCard: {
    backgroundColor: 'white',
    padding: 10,
    elevation: 5,
  },
});
