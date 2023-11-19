import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './Tabs/HomeScreen';
import SettingsScreen from './Tabs/SettingsScreen';
import HomeHeader from '../components/Headers/HomeHeader';
import OctIcons from 'react-native-vector-icons/Octicons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NewAudit from './Tabs/NewAudit';
import OtherHeaders from '../components/Headers/OtherHeaders';

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarStyle: {paddingTop: 5, paddingBottom: 5, height: 60},
      }}
      sceneContainerStyle={styles.container}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          header: () => <HomeHeader />,
          tabBarLabel: 'Home',
          tabBarLabelStyle: {fontSize: 12},
          tabBarIcon: ({color, size}) => (
            <OctIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Audit"
        component={NewAudit}
        options={{
          tabBarIcon: ({color, size}) => (
            <AntDesign name="addfile" size={size} color={color} />
          ),
          header: () => <OtherHeaders />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <IonIcons name="settings-outline" size={size} color={color} />
          ),
          header: () => <OtherHeaders />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    backgroundColor: 'white',
  },
});
