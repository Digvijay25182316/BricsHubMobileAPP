import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';

const ProgressComponent: React.FC = () => {
  const [progress] = useState(new Animated.Value(0));
  const [progressText, setProgressText] = useState('0%');

  useEffect(() => {
    const animation = Animated.timing(progress, {
      toValue: 0.5,
      duration: 1000,
      useNativeDriver: false,
    });

    progress.addListener(({value}) => {
      const percentage = Math.round(value * 100);
      setProgressText(`${percentage}%`);
    });

    animation.start();

    return () => {
      progress.removeAllListeners();
    };
  }, [progress]);

  const interpolatedProgress = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{progressText}</Text>
      <Animated.View
        style={[styles.progressBar, {width: interpolatedProgress}]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  label: {
    marginBottom: 8,
  },
  progressBar: {
    height: 15,
    backgroundColor: '#3498db',
  },
});

export default ProgressComponent;
