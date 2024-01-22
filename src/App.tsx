import './config/polyfills';
import React, {useEffect} from 'react';
import {StyleSheet, Appearance} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screen/Home';
import {NavigationContainer} from '@react-navigation/native';
import AuthScreen from './screen/InititalScreens/AuthScreen';
import SetProfile from './screen/InititalScreens/SetProfile';
import SettingsScreen from './screen/SettingsScreen';
import {useIsDarkController} from './store/store';

function App(): JSX.Element {
  const Stack = createNativeStackNavigator();
  const setIsDark = useIsDarkController(state => state.setIsDark);
  useEffect(() => {
    if (Appearance.getColorScheme() === 'light') {
      setIsDark(false);
    } else {
      setIsDark(true);
    }
  }, []);

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="auth" component={AuthScreen} />
        <Stack.Screen name="profile" component={SetProfile} />
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3396FF',
    borderRadius: 20,
    width: 200,
    height: 50,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    marginTop: 4,
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
  },
  inputText: {
    backgroundColor: 'gray',
  },
});

export default App;
