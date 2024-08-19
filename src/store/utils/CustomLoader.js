import React from 'react';
import {View, StyleSheet, Animated} from 'react-native';

const BouncingBallsLoader = () => {
  const bounceValue = new Animated.Value(0);

  Animated.loop(
    Animated.sequence([
      Animated.timing(bounceValue, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(bounceValue, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]),
  ).start();

  const translateY = bounceValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30],
  });

  return (
    <View style={styles.loaderContainer}>
      <View style={styles.ballsContainer}>
        <Animated.View style={[styles.ball, {transform: [{translateY}]}]} />
        <Animated.View style={[styles.ball, {transform: [{translateY}]}]} />
        <Animated.View style={[styles.ball, {transform: [{translateY}]}]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  ballsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 120,
  },
  ball: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'grey',
  },
});

export default BouncingBallsLoader;
