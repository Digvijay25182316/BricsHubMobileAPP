import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import {useIsDarkController} from '../store/store';

type FlatListAudit = {
  AuditFlatList: Audit[];
};

const FlatListHomescreen: React.FC<FlatListAudit> = ({AuditFlatList}) => {
  const isDark = useIsDarkController(state => state.isDark);
  return (
    <View>
      <FlatList
        data={AuditFlatList}
        renderItem={({item, index}) => (
          <View
            style={{
              borderColor: 'rgb(100 116 139)',
              borderWidth: 1,
              marginVertical: 20,
              borderRadius: 20,
            }}>
            <Text
              style={{
                fontSize: 15,
                margin: 5,
                color: !isDark ? 'black' : 'white',
              }}
              numberOfLines={1}>
              PlotID : {item.plotID}
            </Text>
            <Text
              style={{
                fontSize: 15,
                margin: 5,
                color: !isDark ? 'black' : 'white',
              }}
              numberOfLines={1}>
              ProjectID : {item.projectID}
            </Text>
            <Text
              style={{
                fontSize: 15,
                margin: 5,
                color: !isDark ? 'black' : 'white',
              }}
              numberOfLines={1}>
              AuditID : {item.AuditID}
            </Text>
            <Text
              style={{
                fontSize: 15,
                margin: 5,
                color: !isDark ? 'black' : 'white',
              }}
              numberOfLines={1}>
              latitude : {item.latitude}
            </Text>
            <Text
              style={{
                fontSize: 15,
                margin: 5,
                color: !isDark ? 'black' : 'white',
              }}
              numberOfLines={1}>
              longitude : {item.longitude}
            </Text>
          </View>
        )}
        keyExtractor={(_, index: any) => index}
      />
    </View>
  );
};

export default FlatListHomescreen;

const styles = StyleSheet.create({});
