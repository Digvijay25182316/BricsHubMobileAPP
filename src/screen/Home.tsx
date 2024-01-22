import {StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './Tabs/HomeScreen';
import Profile from './Tabs/Profile';
import HomeHeader from '../components/Headers/HomeHeader';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NewAudit from './Tabs/NewAudit';
// import NewAudit2 from './Tabs/NewAudit2';
import OtherHeaders from '../components/Headers/OtherHeaders';
import {useIsDarkController} from '../store/store';
import Notifications from './Tabs/Notification';
const Tab = createBottomTabNavigator();

const Home = () => {
  const isDark = useIsDarkController(state => state.isDark);
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarStyle: {
          paddingTop: 5,
          paddingBottom: 5,
          height: 55,
          backgroundColor: isDark ? 'rgb(55 65 81)' : 'white',
          borderTopColor: isDark ? 'rgb(55 65 81)' : 'rgb(209 213 219)',
          elevation: 10,
        },
      }}
      sceneContainerStyle={styles.container}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          header: () => <HomeHeader />,
          tabBarLabel: 'Home',
          tabBarLabelStyle: {fontSize: 12},
          tabBarActiveTintColor: 'rgb(22 163 74)',
          tabBarIcon: ({color, focused, size}) =>
            focused ? (
              <Fontisto name="home" size={size} color={color} />
            ) : (
              <SimpleLineIcons name={'home'} size={size} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="Audit"
        component={NewAudit}
        options={{
          tabBarLabelStyle: {fontSize: 12},
          tabBarActiveTintColor: 'rgb(22 163 74)',
          tabBarIcon: ({color, focused, size}) =>
            focused ? (
              <Ionicons name="document-sharp" size={size} color={color} />
            ) : (
              <AntDesign name="addfile" size={size} color={color} />
            ),
          header: () => <OtherHeaders />,
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notifications}
        options={{
          tabBarLabelStyle: {fontSize: 12},
          tabBarActiveTintColor: 'rgb(22 163 74)',
          tabBarIcon: ({color, focused, size}) =>
            focused ? (
              <Ionicons name="notifications-sharp" size={size} color={color} />
            ) : (
              <Ionicons
                name="notifications-outline"
                size={size}
                color={color}
              />
            ),
          header: () => <OtherHeaders />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabelStyle: {fontSize: 12},
          tabBarActiveTintColor: 'rgb(22 163 74)',
          tabBarIcon: ({color, focused, size}) =>
            focused ? (
              <FontAwesome name="user" size={size} color={color} />
            ) : (
              <FontAwesome name={'user-o'} size={size} color={color} />
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
