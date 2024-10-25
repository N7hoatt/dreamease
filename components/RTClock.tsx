import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

// Move the function outside the component for optimization
const formatDateTime = (date) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  };
  return date.toLocaleString(undefined, options);
};

const RealTimeClock = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date()); // Update every second
    }, 1000);

    return () => clearInterval(timer); // Cleanup when unmounted
  }, []);

  const formattedDateTime = formatDateTime(currentDateTime).split(' at ');
  const date = formattedDateTime[0]; 
  const time = formattedDateTime[1]; 

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{date}</Text>
      <Text style={styles.timeText}>{time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282c34',
    padding: 20,
  },
  dateText: {
    fontSize: 24,
    color: '#61dafb',
    textAlign: 'center',
    padding: 5,
  },
  timeText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#61dafb',
    textAlign: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#1c1e22',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default RealTimeClock;
