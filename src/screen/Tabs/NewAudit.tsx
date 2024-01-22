import {
  Alert,
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  ToastAndroid,
  View,
  ScrollView,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useWalletConnectModal} from '@walletconnect/modal-react-native';
import ContractUtils from '../../utils/ContractUtils';
import {ethers} from 'ethers';
import {RequestModal} from '../../components/RequestModal2';
import {useClient, useIsDarkController} from '../../store/store';
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';
import {exportCSV} from '../../types/Tools';
import CopyReadHash from '../../components/CopyReadHash';
import {getTotalAuditCount, submitAudit} from '../../utils/SRAudit';
import ProgressAudit from '../../components/ProgressAudit';
import {getCurrentDate} from '../../utils/CurrentDate';
import {hasLocationPermission} from '../../utils/GetLocationPermission';

const NewAudit = () => {
  const client = useClient(state => state.client);
  const [modalVisible, setModalVisible] = useState(false);
  const [AuditCount, setAuditCount] = useState<number>();
  const [rpcResponse, setRpcResponse] = useState<any>();
  const [rpcError, setRpcError] = useState<any>();
  const [loading, setLoading] = useState(false);
  const {isConnected} = useWalletConnectModal();
  const [location, setLocation] = useState<GeoPosition | null>(null);
  const [lattitude, setLattitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [auditid, setAuditid] = useState<string>('');
  const [projectid, setProjectId] = useState<string>('');
  const [plotid, setPlotId] = useState<string>('');
  const isDark = useIsDarkController(state => state.isDark);

  useEffect(() => {
    if (Number(lattitude) && Number(longitude) >= 0) {
      const openGps = (lat: number, lng: number) => {
        var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
        var url = scheme + `${lat},${lng}`;
        Linking.openURL(url);
      };
      openGps(Number(lattitude), Number(longitude));
    }
    (async () => {
      const totalCount = await getTotalAuditCount();
      setAuditCount(totalCount);
    })();
  }, [lattitude, longitude]);

  const onResponse = (response: any) => {
    setRpcResponse(response);
    setLoading(false);
    ToastAndroid.showWithGravity(
      'please fill all the details',
      ToastAndroid.BOTTOM,
      ToastAndroid.LONG,
    );
    submitAudit();
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
      setLoading(false);
    } catch (error: any) {
      onResponse({
        error: error?.message || 'error',
      });
      setRpcError(error.message || 'error');
    }
  };

  const onWriteContract = async () => {
    if (!projectid && !plotid && !auditid && !lattitude && !longitude) {
      ToastAndroid.showWithGravity('fill all of the fields carefully', 23, 23);
      onModalClose();
      return;
    }
    if (!client) {
      onModalClose();
      return;
    }
    const [address] = await client.listAccounts();
    const signer = client.getSigner(address);
    const contract = new ethers.Contract(
      ContractUtils.contractAddress,
      ContractUtils.goerliABI,
      signer,
    );
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
      .then(data =>
        ToastAndroid.showWithGravity(
          'downloaded in device',
          ToastAndroid.BOTTOM,
          ToastAndroid.LONG,
        ),
      )
      .catch((err: any) =>
        ToastAndroid.showWithGravity(
          err.message || err,
          ToastAndroid.BOTTOM,
          ToastAndroid.LONG,
        ),
      );
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
      setAuditid(
        `${projectid}${plotid}${formattedDate}${
          '0' + (AuditCount ? AuditCount : 0 + 1).toString()
        }`,
      );
    } else {
      ToastAndroid.showWithGravity(
        'please fill all the details',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
    }
  };

  return (
    <View
      style={
        !isDark
          ? {backgroundColor: 'white'}
          : {backgroundColor: 'rgb(31 41 55)'}
      }>
      <ProgressAudit
        PlotId={plotid}
        ProjectId={projectid}
        Latitude={lattitude}
        Longitude={longitude}
        AuditId={auditid}
      />
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'column',
          gap: 20,
          paddingBottom: 40,
        }}
        style={styles.container}>
        <Text
          style={{
            color: 'rgb(156 163 175)',
            padding: 4,
            backgroundColor: !isDark ? 'rgb(229 231 235)' : 'rgb(75 85 99)',
          }}>
          Personal Info
        </Text>
        <View style={styles.inputContainer}>
          <Text
            style={[styles.inputLabel, {color: !isDark ? 'black' : 'white'}]}>
            Owner FirstName
          </Text>
          <TextInput
            placeholder="enter your Plot ID"
            style={[
              styles.inputField,
              {backgroundColor: !isDark ? 'white' : 'rgb(55 65 81)'},
              {color: !isDark ? 'rgb(55 65 81)' : 'white'},
            ]}
            placeholderTextColor={
              !isDark ? 'rgb(156 163 175)' : 'rgb(156 163 175)'
            }
          />
        </View>
        <View style={styles.LocationCoordinates}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: !isDark ? 'white' : 'rgb(55 65 81)',
              elevation: 3,
              minWidth: '100%',
              paddingHorizontal: 5,
            }}>
            <Text
              style={[
                styles.LocationCoordinatesText,
                {color: !isDark ? 'black' : 'white'},
              ]}>
              Latitude :
            </Text>
            <TextInput
              placeholder="enter Latitude manually"
              defaultValue={lattitude}
              placeholderTextColor={
                !isDark ? 'rgb(156 163 175)' : 'rgb(156 163 175)'
              }
              style={{
                flex: 1,
                color: !isDark ? 'rgb(55 65 81)' : 'white',
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: !isDark ? 'white' : 'rgb(55 65 81)',
              elevation: 3,
              minWidth: '100%',
              paddingHorizontal: 5,
            }}>
            <Text
              style={[
                styles.LocationCoordinatesText,
                {color: !isDark ? 'black' : 'white'},
              ]}>
              Longitude :
            </Text>
            <TextInput
              placeholder="enter Longitude manunally"
              defaultValue={longitude}
              placeholderTextColor={
                !isDark ? 'rgb(156 163 175)' : 'rgb(156 163 175)'
              }
              style={{
                flex: 1,
                color: !isDark ? 'rgb(55 65 81)' : 'white',
              }}
            />
          </View>
        </View>
        {location === null && (
          <Text
            style={{
              textAlign: 'center',
              fontSize: 15,
              color: !isDark ? 'black' : 'white',
            }}>
            or
          </Text>
        )}
        {location === null && (
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: !isDark ? 'green' : 'green',
              borderRadius: 8,
              gap: 10,
            }}
            onPress={onGeoLocationAccess}>
            <Image
              source={{
                uri: 'https://media.istockphoto.com/id/1151842972/vector/click-mouse-icon-in-transparent-style-pointer-vector-illustration-on-isolated-background.jpg?s=612x612&w=0&k=20&c=o3AZMMY578SM3feaFsGzhfacwGFZMe0ne7JDQu030Zo=',
                height: 30,
                width: 30,
              }}
              borderRadius={20}
            />
            <Text style={[styles.buttonText]}>
              click to display your current Geolocation
            </Text>
          </TouchableOpacity>
        )}
        <Text
          style={{
            color: 'rgb(156 163 175)',
            padding: 4,
            marginTop: 10,
            backgroundColor: !isDark ? 'rgb(229 231 235)' : 'rgb(75 85 99)',
          }}>
          All the id's
        </Text>
        <View style={styles.inputContainer}>
          <Text
            style={[styles.inputLabel, {color: !isDark ? 'black' : 'white'}]}>
            Project ID
          </Text>
          <TextInput
            placeholder="enter your Project ID"
            style={[
              styles.inputField,
              {backgroundColor: !isDark ? 'white' : 'rgb(55 65 81)'},
              {color: !isDark ? 'rgb(55 65 81)' : 'white'},
            ]}
            placeholderTextColor={
              !isDark ? 'rgb(156 163 175)' : 'rgb(156 163 175)'
            }
            value={projectid}
            onChangeText={(text: any) => setProjectId(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text
            style={[styles.inputLabel, {color: !isDark ? 'black' : 'white'}]}>
            Plot ID
          </Text>
          <TextInput
            placeholder="enter your Plot ID"
            style={[
              styles.inputField,
              {backgroundColor: !isDark ? 'white' : 'rgb(55 65 81)'},
              {color: !isDark ? 'rgb(55 65 81)' : 'white'},
            ]}
            placeholderTextColor={
              !isDark ? 'rgb(156 163 175)' : 'rgb(156 163 175)'
            }
            value={plotid}
            onChangeText={(text: any) => setPlotId(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text
            style={[styles.inputLabel, {color: !isDark ? 'black' : 'white'}]}>
            Government Photo ID
          </Text>
          <TextInput
            placeholder="enter your Plot ID"
            style={[
              styles.inputField,
              {backgroundColor: !isDark ? 'white' : 'rgb(55 65 81)'},
              {color: !isDark ? 'rgb(55 65 81)' : 'white'},
            ]}
            placeholderTextColor={
              !isDark ? 'rgb(156 163 175)' : 'rgb(156 163 175)'
            }
          />
        </View>
        <View style={styles.inputContainer}>
          <Text
            style={[styles.inputLabel, {color: !isDark ? 'black' : 'white'}]}>
            Owner Photo ID
          </Text>
          <TextInput
            placeholder="enter your Plot ID"
            style={[
              styles.inputField,
              {backgroundColor: !isDark ? 'white' : 'rgb(55 65 81)'},
              {color: !isDark ? 'rgb(55 65 81)' : 'white'},
            ]}
            placeholderTextColor={
              !isDark ? 'rgb(156 163 175)' : 'rgb(156 163 175)'
            }
          />
        </View>

        <View style={styles.inputContainer}>
          <Text
            style={[styles.inputLabel, {color: !isDark ? 'black' : 'white'}]}>
            Gat No
          </Text>
          <TextInput
            placeholder="enter your Plot ID"
            style={[
              styles.inputField,
              {backgroundColor: !isDark ? 'white' : 'rgb(55 65 81)'},
              {color: !isDark ? 'rgb(55 65 81)' : 'white'},
            ]}
            placeholderTextColor={
              !isDark ? 'rgb(156 163 175)' : 'rgb(156 163 175)'
            }
          />
        </View>

        <View style={styles.inputContainer}>
          <Text
            style={[styles.inputLabel, {color: !isDark ? 'black' : 'white'}]}>
            Plot Area
          </Text>
          <TextInput
            placeholder="enter your Plot ID"
            style={[
              styles.inputField,
              {backgroundColor: !isDark ? 'white' : 'rgb(55 65 81)'},
              {color: !isDark ? 'rgb(55 65 81)' : 'white'},
            ]}
            placeholderTextColor={
              !isDark ? 'rgb(156 163 175)' : 'rgb(156 163 175)'
            }
          />
        </View>

        {!auditid ? (
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: !isDark ? 'green' : 'green',
              borderRadius: 8,
              gap: 10,
            }}
            onPress={getAuditID}>
            <Image
              source={{
                uri: 'https://media.istockphoto.com/id/1151842972/vector/click-mouse-icon-in-transparent-style-pointer-vector-illustration-on-isolated-background.jpg?s=612x612&w=0&k=20&c=o3AZMMY578SM3feaFsGzhfacwGFZMe0ne7JDQu030Zo=',
                height: 30,
                width: 30,
              }}
              borderRadius={20}
            />
            <Text
              style={[
                styles.AuditIDgetText,
                {color: !isDark ? 'white' : 'white'},
              ]}>
              click to generate your audit id
            </Text>
          </TouchableOpacity>
        ) : (
          <Text
            style={[styles.inputLabel, {color: !isDark ? 'black' : 'white'}]}>
            {auditid}
          </Text>
        )}
        <TouchableOpacity
          style={[styles.button, !isConnected && styles.buttonDisabled]}
          disabled={!isConnected}
          onPress={onAction(onWriteContract)}>
          <Text
            style={[styles.buttonText, {color: !isDark ? 'black' : 'white'}]}>
            Submit
          </Text>
        </TouchableOpacity>
        <RequestModal
          isVisible={modalVisible}
          onClose={onModalClose}
          isLoading={loading}
          rpcResponse={rpcResponse}
          rpcError={rpcError}
        />
        {rpcResponse && <CopyReadHash hash={rpcResponse?.response} />}
      </ScrollView>
    </View>
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
    textAlign: 'center',
  },
  inputField: {
    marginHorizontal: 5,
    elevation: 2,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 200,
    height: 50,
    borderWidth: 1,
    backgroundColor: 'rgb(255, 69, 0)',
    borderRadius: 5,
    marginTop: 4,
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: 'red',
    fontWeight: '700',
  },
  LocationCoordinates: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  LocationCoordinatesText: {
    textAlign: 'center',
  },
  AuditIDgetButton: {
    backgroundColor: 'rgb(22 163 74)',
    padding: 10,
    borderRadius: 10,
    elevation: 3,
  },
  AuditIDgetText: {
    textAlign: 'center',
  },
  TextLight: {
    color: 'black',
  },
  TextDark: {
    color: 'white',
  },
});
