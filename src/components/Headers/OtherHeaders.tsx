import {Pressable, StyleSheet, Text, View, Appearance} from 'react-native';
import React from 'react';
import {Link, useRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useIsDarkController} from '../../store/store';

const OtherHeaders = () => {
  const Route = useRoute();
  const isDark = useIsDarkController(state => state.isDark);
  return (
    <View style={!isDark ? styles.ContainerLight : styles.ContainerDark}>
      <View style={styles.NotificationLeftContainer}>
        <Text style={!isDark ? styles.HeaderTextLight : styles.HeaderTextDark}>
          {Route.name}
        </Text>
      </View>
      {Route.name !== 'settings' && (
        <Link to={'/settings'} style={styles.NotificationIcon}>
          <Ionicons
            name="settings-outline"
            size={24}
            color={!isDark ? 'black' : 'white'}
          />
        </Link>
      )}
    </View>
  );
};

export default OtherHeaders;

const styles = StyleSheet.create({
  ContainerLight: {
    flexDirection: 'row',
    backgroundColor: 'white',
    minHeight: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  ContainerDark: {
    flexDirection: 'row',
    backgroundColor: 'rgb(31 41 55)',
    minHeight: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  HeaderTextLight: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
  },
  HeaderTextDark: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
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
    minHeight: 60,
    alignItems: 'center',
  },
  notificationLeftBack: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
});
