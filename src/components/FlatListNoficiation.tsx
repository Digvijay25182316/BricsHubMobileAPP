import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface NotificationArr {
  notification: notification[];
}

const FlatListNoficiation = ({notification}: NotificationArr) => {
  return (
    <View>
      <FlatList
        data={notification}
        renderItem={({item}) => (
          <View>
            <Text>{item.message}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default FlatListNoficiation;

const styles = StyleSheet.create({});
