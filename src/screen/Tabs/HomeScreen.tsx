import React, {useState} from 'react';
import {useClient, useIsDarkController} from '../../store/store';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  ToastAndroid,
  TextInput,
  Appearance,
} from 'react-native';
import {ethers} from 'ethers';
import {useWalletConnectModal} from '@walletconnect/modal-react-native';
import ContractUtils from '../../utils/ContractUtils';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {useNavigation} from '@react-navigation/native';
import FlatListHomescreen from '../../components/FlatListHomescreen';

const HomeScreen = () => {
  const client = useClient(state => state.client);
  const [response, setResponse] = useState<Audit[]>([]);
  const {isConnected, provider, address} = useWalletConnectModal();

  const onReadContract = async () => {
    if (!isConnected) {
      ToastAndroid.show(
        `You haven't connected your wallet yet`,
        ToastAndroid.SHORT,
      );
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
      ToastAndroid.showWithGravity(
        `${error.code || error.error.message || error.message || error}`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      console.log(error);
    }
  };
  const navigation: any = useNavigation();
  const isDark = useIsDarkController(state => state.isDark);
  return (
    <View style={!isDark ? styles.containerLight : styles.containerDark}>
      <View style={styles.heroWalletSection}>
        <View
          style={
            !isDark
              ? [
                  styles.ConnectWalletButton,
                  {borderWidth: 1, borderColor: 'rgb(209 213 219)'},
                ]
              : [
                  styles.ConnectWalletButton,
                  {borderWidth: 1, borderColor: 'rgb(75 85 99)'},
                ]
          }>
          <TextInput
            style={styles.ConnectWalletText}
            placeholder="Seach your Transaction hash"
            placeholderTextColor={
              !isDark ? 'rgb(107 114 128)' : 'rgb(209 213 219)'
            }
          />
          <AntDesign
            name="search1"
            size={26}
            color="white"
            style={{
              backgroundColor: 'rgb(55 65 81)',
              padding: 11,
              borderRadius: 100,
              elevation: 10,
            }}
          />
        </View>
      </View>
      <View
        style={{alignItems: 'center', justifyContent: 'center', width: '100%'}}>
        <TouchableOpacity onPress={onReadContract} style={styles.onReadButton}>
          <Text style={{color: 'black', textAlign: 'center'}}>
            View Audit List
          </Text>
        </TouchableOpacity>
      </View>
      <FlatListHomescreen AuditFlatList={response} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  containerDark: {
    minHeight: '100%',
    paddingHorizontal: 10,
    backgroundColor: 'rgb(31 41 55)',
  },
  containerLight: {
    minHeight: '100%',
    paddingHorizontal: 10,
  },

  heroWalletSection: {
    padding: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  ConnectWalletButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    gap: 5,
    borderRadius: 40,
  },
  ConnectWalletText: {
    color: 'white',
    fontSize: 18,
  },
  onReadButton: {
    backgroundColor: 'rgb(229 231 235)',
    maxWidth: 150,
    padding: 10,
    borderRadius: 5,
    elevation: 10,
  },
  dataCard: {
    backgroundColor: 'white',
    padding: 10,
    elevation: 5,
    margin: 5,
    borderRadius: 10,
  },
});
