import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const OtherHeaders = () => {
  const Route = useRoute();
  const navigation = useNavigation();
  return (
    <View
      style={
        Route.name !== 'notifications'
          ? styles.container
          : styles.NotificationLessContainer
      }>
      <Pressable
        style={{backgroundColor: 'black', borderRadius: 30}}
        onPress={() => navigation.goBack()}>
        <AntDesign name="leftcircle" size={30} color="rgb(243 244 246)" />
      </Pressable>
      <Text
        style={
          Route.name !== 'notifications'
            ? styles.HeaderText
            : styles.notificationLessBack
        }>
        {Route.name}
      </Text>
      {Route.name !== 'notifications' && (
        <View style={styles.NotificationIcon}>
          <FontAwesome name="bell-o" size={24} color="rgb(156 163 175)" />
          <Text style={styles.NotificationNumber}>{''}</Text>
        </View>
      )}
    </View>
  );
};

export default OtherHeaders;

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
  HeaderText: {
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
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
  NotificationLessContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    minHeight: 60,
    alignItems: 'center',
    paddingHorizontal: 20,
    elevation: 5,
    zIndex: 100,
  },
  notificationLessBack: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
  },
});
