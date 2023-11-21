import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import React from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import Feather from 'react-native-vector-icons/Feather';

const CopyReadHash = ({hash}: {hash: string}) => {
  const onCopy = (value: string) => {
    Clipboard.setString(value);
  };
  const txLink = () => {
    const url = `https://sepolia.etherscan.io/tx/${hash}`;

    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Could not open the URL. Please try again later.');
      }
    });
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.Copyhash}>
          <Text style={styles.CopyText}>{hash}</Text>
          <TouchableOpacity onPress={() => onCopy(hash)}>
            <Feather name="copy" size={24} color="rgb(75 85 99)" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.OrText}>Or</Text>
      <TouchableOpacity onPress={() => txLink()} style={styles.openUrl}>
        <Text style={styles.openUrlText}>openurl</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CopyReadHash;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    gap: 10,
    backgroundColor: 'rgb(254 242 242)',
    paddingVertical: 10,
    borderRadius: 20,
  },
  container: {
    backgroundColor: 'rgb(229 231 235)',
    padding: 10,
    borderRadius: 10,
  },
  Copyhash: {
    flexDirection: 'row',
    gap: 10,
    padding: 10,
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  CopyText: {maxWidth: 300},
  OrText: {
    color: 'gray',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  openUrl: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  openUrlText: {
    backgroundColor: 'lightgreen',
    padding: 10,
    fontSize: 20,
    borderRadius: 10,
  },
});
