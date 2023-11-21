import {
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  ToastAndroid,
  View,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {
  useWalletConnectModal,
  WalletConnectModal,
} from '@walletconnect/modal-react-native';
import ContractUtils from '../../utils/ContractUtils';
import {numberToHex, sanitizeHex} from '@walletconnect/encoding';
import {ethers} from 'ethers';
import {Web3Provider} from '@ethersproject/providers';
import OtherHeaders from '../../components/Headers/OtherHeaders';
import {RequestModal} from '../../components/RequestModal';
import {useClient} from '../../store/store';
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';
import appConfig from '../../../app.json';
import {exportCSV} from '../../types/Tools';
import CopyReadHash from '../../components/CopyReadHash';

const NewAudit = () => {
  const client = useClient(state => state.client);
  const [modalVisible, setModalVisible] = useState(false);
  const [rpcResponse, setRpcResponse] = useState<any>();
  const [loading, setLoading] = useState(false);
  const {isConnected, provider, open} = useWalletConnectModal();
  const [location, setLocation] = useState<GeoPosition | null>(null);
  const [lattitude, setLattitude] = useState<string>();
  const [longitude, setLongitude] = useState<string>();
  const [auditid, setAuditid] = useState<string>();
  const [projectid, setProjectId] = useState<string>();
  const [plotid, setPlotId] = useState<string>();

  function getCurrentDate() {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = months[currentDate.getMonth()];
    const year = currentDate.getFullYear();

    const formattedDate = `${day}${month}${year}`;

    return formattedDate;
  }

  const hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert(
        `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
        '',
        [
          {text: 'Go to Settings', onPress: openSetting},
          {text: "Don't Use Location", onPress: () => {}},
        ],
      );
    }

    return false;
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
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
      setModalVisible(false);
      setLoading(false);
    } catch (error: any) {
      onResponse({
        error: error?.message || 'error',
      });
    }
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
    if (!projectid && !plotid && !auditid && !lattitude && !longitude) {
      Alert.alert('fill all of the fields carefully');
      onModalClose();
      return;
    }
    const receipt = await contract.addField(
      projectid,
      plotid,
      lattitude,
      longitude,
      auditid,
    );
    const receiptOb: Audit[] = [
      {
        projectID: projectid,
        plotID: plotid,
        latitude: lattitude,
        longitude: longitude,
        AuditID: auditid,
      },
    ];
    await exportCSV(receiptOb)
      .then(data => console.log(data))
      .catch(err => console.log(err));
    const hash = receipt.hash;
    return {
      method: 'write contract',
      response: hash,
    };
  };

  const onGeoLocationAccess = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        setLocation(position);
        setLattitude(position.coords.latitude.toString());
        setLongitude(position.coords.longitude.toString());
      },
      error => {
        Alert.alert(`Code ${error.code}`, error.message);
        setLocation(null);
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: true,
        forceLocationManager: false,
        showLocationDialog: true,
      },
    );
  };

  const getAuditID = () => {
    if (projectid && plotid) {
      const formattedDate = getCurrentDate();
      setAuditid(`${projectid}${plotid}${formattedDate}`);
    } else {
      Alert.alert('please fill all the details');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexDirection: 'column',
        gap: 20,
        paddingBottom: 40,
      }}
      style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Project ID</Text>
        <TextInput
          placeholder="enter your Project ID"
          style={styles.inputField}
          value={projectid}
          onChangeText={(text: any) => setProjectId(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Plot ID</Text>
        <TextInput
          placeholder="enter your Plot ID"
          style={styles.inputField}
          value={plotid}
          onChangeText={(text: any) => setPlotId(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Government Photo ID</Text>
        <TextInput placeholder="enter your Plot ID" style={styles.inputField} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Owner Photo ID</Text>
        <TextInput placeholder="enter your Plot ID" style={styles.inputField} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Owner FirstName</Text>
        <TextInput placeholder="enter your Plot ID" style={styles.inputField} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Gat No</Text>
        <TextInput placeholder="enter your Plot ID" style={styles.inputField} />
      </View>
      {location !== null ? (
        <View style={styles.LocationCoordinates}>
          <Text style={styles.LocationCoordinatesText}>
            Latitude : {lattitude}
          </Text>
          <Text style={styles.LocationCoordinatesText}>
            Longitude : {longitude}
          </Text>
        </View>
      ) : (
        <TouchableOpacity style={styles.button} onPress={onGeoLocationAccess}>
          <Text style={[styles.buttonText, {color: 'red'}]}>
            Click Now To display your current latitude and longitude
          </Text>
        </TouchableOpacity>
      )}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Plot Area</Text>
        <TextInput placeholder="enter your Plot ID" style={styles.inputField} />
      </View>

      {!auditid ? (
        <TouchableOpacity style={styles.button} onPress={getAuditID}>
          <Text style={styles.AuditIDgetText}>get your Audit ID</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.inputLabel}>{auditid}</Text>
      )}
      <TouchableOpacity
        style={[styles.button, !isConnected && styles.buttonDisabled]}
        disabled={!isConnected}
        onPress={onAction(onWriteContract)}>
        <Text style={[styles.buttonText, {color: 'black'}]}>Submit</Text>
      </TouchableOpacity>
      <RequestModal
        isVisible={modalVisible}
        onClose={onModalClose}
        isLoading={loading}
      />
      {rpcResponse && <CopyReadHash hash={rpcResponse?.response} />}
    </ScrollView>
  );
};

export default NewAudit;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 20,
    paddingHorizontal: 10,
    paddingTop: 30,
  },
  inputContainer: {
    flexDirection: 'column',
    gap: 10,
  },
  inputLabel: {
    paddingLeft: 5,
    fontSize: 16,
    color: 'black',
  },
  inputField: {
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(250 204 21)',
    borderRadius: 20,
    minWidth: 200,
    height: 50,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    marginTop: 4,
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
  buttonText: {
    fontWeight: '700',
  },
  LocationCoordinates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    // backgroundColor: 'rgb(253 224 71)',
    backgroundColor: 'white',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 4,
  },
  LocationCoordinatesText: {
    textAlign: 'center',
    color: 'black',
  },
  AuditIDgetButton: {
    backgroundColor: 'rgb(253 224 71)',
    padding: 10,
    borderRadius: 10,
    elevation: 3,
  },
  AuditIDgetText: {
    textAlign: 'center',
    color: 'black',
  },
});
