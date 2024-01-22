import {StyleSheet, Text, View, Appearance} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Link} from '@react-navigation/native';
import {useIsDarkController} from '../../store/store';

const HomeHeader = () => {
  const ColorScheme = Appearance.getColorScheme();
  const isDark = useIsDarkController(state => state.isDark);

  return (
    <View style={!isDark ? styles.ContainerLight : styles.ContainerDark}>
      <View style={styles.HeaderSection}>
        <Text
          style={
            !isDark ? [styles.BricsHubLogoLight] : styles.BricsHubLogoDark
          }>
          Bricshub
        </Text>
        <Link to={'/settings'}>
          <View style={styles.HeaderSectionRight}>
            <Ionicons
              name="settings-outline"
              size={28}
              color={!isDark ? 'black' : 'white'}
            />
          </View>
        </Link>
      </View>
    </View>
  );
};
export default HomeHeader;

const styles = StyleSheet.create({
  ContainerDark: {
    backgroundColor: 'rgb(31 41 55)',
    paddingTop: 30,
  },
  ContainerLight: {
    backgroundColor: 'white',
    paddingTop: 30,
  },
  BricsHubLogoDark: {
    color: 'rgb(229 231 235)',
    fontSize: 25,
    fontWeight: '800',
  },
  BricsHubLogoLight: {
    color: 'rgb(31 41 55)',
    fontSize: 25,
    fontWeight: '800',
  },
  HeaderSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  HeaderSectionRight: {
    position: 'relative',
    flexDirection: 'row',
    gap: 30,
  },
});
