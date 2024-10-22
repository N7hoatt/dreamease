import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Stopwatch from '../../components/Stopwatch';
import RealTimeClock from '../../components/RTClock';

const Page = () => {

  return (
    <View style={styles.container}>
      <RealTimeClock/>
      <Stopwatch/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 48,
    marginBottom: 20,
  },
});

export default Page;