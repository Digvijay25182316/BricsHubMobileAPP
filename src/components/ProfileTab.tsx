import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {useIsDarkController} from '../store/store';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileTab = ({
  name,
  wallet_address,
  email,
  createdAt,
}: {
  name: string;
  wallet_address: string;
  email: string;
  createdAt: string;
}) => {
  const isDark = useIsDarkController(state => state.isDark);
  return (
    <View style={{flexDirection: 'row', padding: 20, gap: 20}}>
      <View
        style={{
          backgroundColor: !isDark ? 'rgb(156 163 175)' : 'rgb(55 65 81)',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 100,
          width: 70,
          height: 70,
        }}>
        <MaterialCommunityIcons
          name="account"
          size={40}
          color={!isDark ? 'rgb(22 101 52)' : 'rgb(22 101 52)'}
        />
      </View>
      <View style={{flexDirection: 'column', gap: 5}}>
        <Text
          style={{
            color: !isDark ? 'rgb(31 41 55)' : 'rgb(209 213 219)',
            width: '70%',
            fontWeight: '600',
          }}
          numberOfLines={1}>
          {wallet_address}
        </Text>
        <Text
          style={{
            color: !isDark ? 'rgb(21 128 61)' : 'rgb(21 128 61)',
            width: '70%',
            fontWeight: 'bold',
            fontSize: 17,
          }}
          numberOfLines={1}>
          {name}
        </Text>
        <Text
          style={{
            color: !isDark ? 'rgb(107 114 128)' : 'rgb(107 114 128)',
            width: '70%',
            fontStyle: 'italic',
            fontWeight: 'bold',
            fontSize: 15,
          }}
          numberOfLines={1}>
          {email}
        </Text>
      </View>
    </View>
  );
};

export default ProfileTab;

const styles = StyleSheet.create({});
