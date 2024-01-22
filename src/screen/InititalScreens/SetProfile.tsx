import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Pressable,
  TextInput,
  ToastAndroid,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {useState} from 'react';
import {Link, useNavigation} from '@react-navigation/native';
import {useWalletConnectModal} from '@walletconnect/modal-react-native';

const SetProfile = () => {
  const navigation = useNavigation();
  const {address} = useWalletConnectModal();
  const [Firstname, setFirstName] = useState<string>();
  const [Lastname, setLastName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const navigate: any = useNavigation();

  const onClickHandler = async () => {
    if (!Firstname || !Lastname || !email || !address) {
      ToastAndroid.showWithGravity(
        'please enter all the fields',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
      return;
    }
    const serverEndPoint = 'https://usermanagementbrics.onrender.com/api';
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const bodydata = {
      name: Firstname + ' ' + Lastname,
      email: email,
      wallet_address: address,
    };
    await fetch(`${serverEndPoint}/register`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(bodydata),
    })
      .then(data => data.json())
      .then(data => {
        data?.message &&
          ToastAndroid.showWithGravity(
            data.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
          );
        navigate.navigate('home');
      })
      .catch(err => console.log('this is error : ', err.message || err));
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.personalInfoHeader}>
        <AntDesign
          name="user"
          size={24}
          color="rgb(21 128 61)"
          style={{
            backgroundColor: 'rgb(55 65 81)',
            padding: 15,
            borderRadius: 100,
            elevation: 10,
          }}
        />
        <Text style={styles.HeaderContainerText}>Personal Info</Text>
      </View>
      <View>
        <Text style={styles.InputTextLable}>First Name : </Text>
        <TextInput
          placeholder="Enter your first name"
          placeholderTextColor={'gray'}
          style={styles.InputTextSection}
          defaultValue={Firstname}
          onChangeText={text => setFirstName(text)}
        />
        <Text style={styles.InputTextLable}>Last Name : </Text>
        <TextInput
          placeholder="Enter your last name"
          placeholderTextColor={'gray'}
          style={styles.InputTextSection}
          defaultValue={Lastname}
          onChangeText={text => setLastName(text)}
        />
        <Text style={styles.InputTextLable}>Email : </Text>
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor={'gray'}
          style={styles.InputTextSection}
          defaultValue={email}
          onChangeText={text => setEmail(text)}
        />
      </View>
      <View style={styles.bottomSection}>
        <Pressable
          style={styles.goBackButton}
          onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="pan-left"
            size={50}
            color="rgb(59 130 246)"
            style={{
              backgroundColor: 'rgb(55 65 81)',
              borderRadius: 100,
              elevation: 10,
            }}
          />
          <Text style={styles.HeaderContainerText}>Go Back</Text>
        </Pressable>
        <Pressable style={styles.skipNowButton} onPress={onClickHandler}>
          <Text style={styles.HeaderContainerText}>Submit</Text>
          <MaterialCommunityIcons
            name="pan-left"
            size={50}
            color="rgb(21 128 61)"
            style={{
              backgroundColor: 'rgb(55 65 81)',
              borderRadius: 100,
              elevation: 10,
              transform: [{rotate: '180deg'}],
            }}
          />
        </Pressable>
      </View>
      <Link to={'/home'}>
        <Text
          style={{
            textDecorationLine: 'underline',
            color: 'gray',
            fontSize: 20,
          }}>
          Skip for now
        </Text>
      </Link>
    </SafeAreaView>
  );
};

export default SetProfile;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
    backgroundColor: 'rgb(31 41 55)',
    gap: 20,
  },
  personalInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(21 128 61)',
    paddingRight: 15,
    gap: 10,
    borderRadius: 40,
    elevation: 10,
  },
  HeaderContainerText: {
    color: 'white',
    fontSize: 20,
  },
  bottomSection: {
    flexDirection: 'row',
    gap: 30,
  },
  goBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(59 130 246)',
    paddingRight: 15,
    gap: 10,
    borderRadius: 40,
    elevation: 10,
    marginBottom: 30,
  },
  skipNowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(21 128 61)',
    paddingLeft: 15,
    gap: 10,
    borderRadius: 40,
    elevation: 10,
    marginBottom: 30,
  },
  InputTextSection: {
    borderWidth: 1,
    color: 'white',
    fontSize: 20,
    borderRadius: 100,
    paddingHorizontal: 10,
    borderColor: 'rgb(113 63 18)',
    maxWidth: 350,
    minWidth: 350,
    marginBottom: 30,
  },
  InputTextLable: {
    color: 'white',
    fontSize: 15,
    paddingLeft: 10,
    marginBottom: 20,
  },
});
