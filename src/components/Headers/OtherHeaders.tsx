import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Link, useRoute} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const OtherHeaders = () => {
  const Route = useRoute();
  const navigation = useNavigation();
  return (
    <View
      style={
        Route.name !== 'notifications'
          ? styles.container
          : styles.NotificationLeftContainer
      }>
      <View style={styles.NotificationLeftContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="pan-left" size={50} color="black" />
        </Pressable>
        <Text
          style={
            Route.name !== 'notifications'
              ? styles.HeaderText
              : styles.notificationLeftBack
          }>
          {Route.name}
        </Text>
      </View>
      {Route.name !== 'notifications' && (
        <Link to={'/notifications'}>
          <View style={styles.NotificationIcon}>
            <FontAwesome name="bell-o" size={24} color="rgb(156 163 175)" />
            <Text style={styles.NotificationNumber}>{''}</Text>
          </View>
        </Link>
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
  NotificationLeftContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    minHeight: 60,
    alignItems: 'center',
  },
  notificationLeftBack: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
  },
});
