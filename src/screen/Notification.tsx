import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import OtherHeaders from '../components/Headers/OtherHeaders';

const Notifications = () => {
  return (
    <View>
      <OtherHeaders />
      <View style={styles.container}>
        <Text>Notifications</Text>
      </View>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    backgroundColor: 'white',
  },
});
