import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useIsDarkController} from '../../store/store';

const ProfileLoading = () => {
  const isDark = useIsDarkController(state => state.isDark);
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        margin: 10,
      }}>
      <Text
        style={{
          backgroundColor: !isDark ? 'rgb(107 114 128)' : 'rgb(17 24 39)',
          borderRadius: 50,
          width: 90,
          height: 90,
        }}>
        {' '}
      </Text>
      <View style={{flexDirection: 'column', flex: 1, gap: 10}}>
        <Text
          style={{
            backgroundColor: !isDark ? 'rgb(156 163 175)' : 'rgb(55 65 81)',
            height: 20,
          }}>
          {' '}
        </Text>
        <Text
          style={{
            backgroundColor: !isDark ? 'rgb(107 114 128)' : 'rgb(17 24 39)',

            height: 20,
            width: '70%',
          }}>
          {' '}
        </Text>
        <Text
          style={{
            backgroundColor: !isDark ? 'rgb(107 114 128)' : 'rgb(55 65 81)',

            height: 20,
            width: '50%',
          }}>
          {' '}
        </Text>
      </View>
    </View>
  );
};

export default ProfileLoading;

const styles = StyleSheet.create({});
