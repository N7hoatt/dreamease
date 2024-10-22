import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import settings from '../app/(tabs)/settings';

const Stopwatch = () => {
  const navigation = useNavigation(); // Get navigation instance
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [durationMessage, setDurationMessage] = useState('');
  const [showNextPageButton, setShowNextPageButton] = useState(false); // New state for Next Page button visibility

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (!isRunning && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleStartStop = () => {
    if (!isRunning) {
      // Starting stopwatch
      if (!startDate && !startTime) {
        const now = new Date();
        const currentDate = now.toLocaleDateString();
        const currentTime = now.toLocaleTimeString();
        setStartDate(currentDate);
        setStartTime(currentTime);
        Alert.alert('Stopwatch Started', `Started at: ${currentTime} on ${currentDate}`);
      }
      setShowNextPageButton(false); // Hide Next Page button when starting
    } else {
      // Stopping stopwatch
      const duration = formatTime(seconds);
      setDurationMessage(`Duration: ${duration}`);
      Alert.alert('Stopwatch Stopped', duration);
      setShowNextPageButton(true); // Show Next Page button when stopped
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
    setStartDate('');
    setStartTime('');
    setDurationMessage('');
    setShowNextPageButton(false); // Reset and hide Next Page button
  };

  const handleNextPage = () => {
    navigation.navigate('settings'); // Navigate to Settings page
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{formatTime(seconds)}</Text>
      {startDate && startTime ? (
        <View style={styles.startTimeContainer}>
          <Text style={styles.startTimeText}>Date: {startDate}</Text>
          <Text style={styles.startTimeText}>Time: {startTime}</Text>
        </View>
      ) : null}
      <TouchableOpacity 
        style={[styles.button, isRunning ? styles.stopButton : styles.startButton]} 
        onPress={handleStartStop}
      >
        <Text style={styles.buttonText}>{isRunning ? 'Stop' : 'Start'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
      {durationMessage ? <Text style={styles.durationText}>{durationMessage}</Text> : null}
      
      {/* Show Next Page Button only when the stopwatch has stopped */}
      {showNextPageButton && (
        <TouchableOpacity style={styles.nextPageButton} onPress={handleNextPage}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 10, // Reduced padding
    backgroundColor: '#2E2E2E',
  },
  timeText: {
    fontSize: 24, // Smaller font size for the time display
    marginBottom: 10, // Reduced margin
    color: '#FFFFFF',
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    width: '100%',
    textAlign: 'center',
  },
  startTimeContainer: {
    alignItems: 'center',
    marginBottom: 10, // Reduced margin
    width: '100%',
  },
  startTimeText: {
    fontSize: 14, // Smaller font size for start time
    marginBottom: 3, // Reduced margin between date and time
    color: '#E0E0E0',
    padding: 5, // Reduced padding
    borderRadius: 5,
    backgroundColor: '#3C3C3C',
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    width: '100%',
    textAlign: 'center',
  },
  button: {
    padding: 5, // Smaller padding
    borderRadius: 8, // Slightly smaller border radius
    marginBottom: 8, // Reduced margin
    width: '45%', // Smaller width for the buttons
    alignItems: 'center',
    elevation: 2, // Lowered shadow elevation
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  stopButton: {
    backgroundColor: '#f44336',
  },
  resetButton: {
    backgroundColor: '#FF9800',
    width: '35%', // Smaller width for the reset button
    padding: 4, // Reduced padding
    borderRadius: 8, // Reduced border radius
    alignItems: 'center',
  },
  nextPageButton: {
    backgroundColor: '#2196F3',
    position: 'absolute',
    bottom: 20, // Adjusted position to be closer to the bottom
    right: 15, // Adjusted position to be closer to the right
    padding: 8, // Reduced padding for the button
    borderRadius: 8, // Smaller border radius
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14, // Smaller font size for button text
    fontWeight: 'bold',
  },
  durationText: {
    fontSize: 14, // Smaller font size for the duration text
    marginTop: 15, // Reduced margin at the top
    fontWeight: 'bold',
    color: '#FFFFFF',
    padding: 8, // Reduced padding for the duration text
    borderRadius: 5,
    backgroundColor: '#3C3C3C',
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});

export default Stopwatch;
