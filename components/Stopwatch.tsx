import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { FIRESTORE_DB } from "../FirebaseConfig"; 
import { useUser } from '../app/UserContext';
import { doc, updateDoc, addDoc, collection, query, where, getDocs } from 'firebase/firestore';

const Stopwatch = () => {
  const { userId } = useUser();
  const router = useRouter();
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [durationMessage, setDurationMessage] = useState('');
  const [showNextPageButton, setShowNextPageButton] = useState(false);
  const [showClockButton, setShowClockButton] = useState(true);
  const [duration, setDuration] = useState(0);

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
    const now = new Date();
    const currentTime = now.toLocaleTimeString();
    const currentDate = now.toLocaleDateString();

    if (!isRunning) {
      // Starting stopwatch
      if (!startDate && !startTime) {
        setStartDate(currentDate);
        setStartTime(currentTime);
        Alert.alert('Stopwatch Started', `Started at: ${currentTime} on ${currentDate}`);
      }
      setShowNextPageButton(false); // Hide Next Page button when starting
    } else {
      // Stopping stopwatch
      const durationFormatted = formatTime(seconds);
      setDurationMessage(`Duration: ${durationFormatted}`);
      setDuration(seconds); // Store duration in seconds
      setEndDate(currentDate);
      setEndTime(currentTime);
      Alert.alert('Stopwatch Stopped', durationFormatted);
      setShowNextPageButton(true); // Show Next Page button when stopped
      setShowClockButton(false);
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
    setStartDate('');
    setStartTime('');
    setEndDate('');
    setEndTime('');
    setDurationMessage('');
    setShowNextPageButton(false);
    setShowClockButton(true);
    setDuration(0);
  };

  const handleNextPage = () => {
    handleReset();
    saveSleepDataToDatabase(); // Call the function to save data before navigating
    router.push({
      pathname: '/settings',
      params: {
        startDate,
        startTime,
        endDate,
        endTime,
        duration,
      },
    });
  };

  // Function to save sleep data to the user's document
  const saveSleepDataToDatabase = async () => {
    try {
      const sleepDateRef = collection(FIRESTORE_DB, "users", userId, "sleepDate");
      const sleepSectionRef = collection(FIRESTORE_DB, "users", userId, "sleepSection");
  
      const startDateTime = new Date(`${startDate}T${startTime}`); // Combine date and time for start
      const endDateTime = new Date(`${endDate}T${endTime}`); // Combine date and time for end
      const midnight = new Date(startDateTime);
      midnight.setHours(24, 0, 0, 0); // Set midnight for the start date
  
      if (startDate === endDate) {
        // If start and end dates are the same, just update as before
        const q = query(sleepDateRef, where("date", "==", startDate));
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          const docRef = querySnapshot.docs[0].ref;
          const existingData = querySnapshot.docs[0].data();
          const newDuration = (existingData.duration || 0) + duration;
  
          await updateDoc(docRef, {
            duration: newDuration
          });
  
          Alert.alert("Success", "Sleep data updated successfully!");
        } else {
          await addDoc(sleepDateRef, {
            date: startDate,
            duration,
          });
  
          Alert.alert("Success", "Sleep data saved successfully!");
        }
      } else {
        // Different start and end dates
        const durationBeforeMidnight = Math.floor((midnight - startDateTime) / 1000); // Duration in seconds until midnight
        const durationAfterMidnight = Math.floor((endDateTime - midnight) / 1000); // Remaining duration after midnight
  
        // Save the first record for the sleep before midnight
        await addDoc(sleepDateRef, {
          date: startDate,
          duration: durationBeforeMidnight,
        });
  
        // Save the second record for the sleep after midnight
        await addDoc(sleepDateRef, {
          date: endDate,
          duration: durationAfterMidnight,
        });
  
        Alert.alert("Success", "Sleep data for both dates saved successfully!");
      }
  
      // Save the sleep section entry
      await addDoc(sleepSectionRef, {
        startTime,
        endTime,
        duration,
      });
  
    } catch (error) {
      console.error("Error saving sleep data: ", error);
      Alert.alert("Error", "Failed to save sleep data. Please try again.");
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{formatTime(seconds)}</Text>
      {startDate && startTime ? (
        <View style={styles.startTimeContainer}>
          <Text style={styles.startTimeText}>Start Date: {startDate}</Text>
          <Text style={styles.startTimeText}>Start Time: {startTime}</Text>
        </View>
      ) : null}

      {/* Conditional Rendering of Start/Stop Button */}
      {showClockButton && (
      <TouchableOpacity 
        style={[styles.button, isRunning ? styles.stopButton : styles.startButton]} 
        onPress={handleStartStop}
      >
        <Text style={styles.buttonText}>{isRunning ? 'Stop' : 'Start'}</Text>
      </TouchableOpacity>)}

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
    padding: 10,
    backgroundColor: '#2E2E2E',
  },
  timeText: {
    fontSize: 24,
    marginBottom: 10,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  startTimeContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  startTimeText: {
    fontSize: 14,
    marginBottom: 3,
    color: '#E0E0E0',
    backgroundColor: '#3C3C3C',
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    width: '45%',
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  stopButton: {
    backgroundColor: '#f44336',
  },
  resetButton: {
    backgroundColor: '#FF9800',
    width: '35%',
    padding: 4,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextPageButton: {
    backgroundColor: '#2196F3',
    position: 'absolute',
    bottom: 20,
    right: 15,
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  durationText: {
    fontSize: 14,
    marginTop: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#3C3C3C',
  },
});

export default Stopwatch;
