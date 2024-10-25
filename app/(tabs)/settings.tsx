import { Alert, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { FIRESTORE_DB } from "../../FirebaseConfig"; 
import { collection, addDoc } from "firebase/firestore";

const SettingsScreen = () => {
  const saveSessionToDatabase = async () => {
    try {
      await addDoc(collection(FIRESTORE_DB, ""), {
        startDate,
        startTime,
        endDate,
        endTime,
        duration,
        createdAt: new Date(), // Optional field to track the creation time
      });
      Alert.alert("Success", "Session saved successfully!");
    } catch (error) {
      console.error("Error saving session: ", error);
      Alert.alert("Error", "Failed to save session. Please try again.");
    }
  };

  const { startDate, startTime, endDate, endTime, duration } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Start Date: {startDate}</Text>
      <Text style={styles.text}>Start Time: {startTime}</Text>
      <Text style={styles.text}>End Date: {endDate}</Text>
      <Text style={styles.text}>End Time: {endTime}</Text>
      <Text style={styles.text}>Duration: {formatDuration(duration)}</Text>
    </View>
  );
};

const formatDuration = (duration) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000022'
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default SettingsScreen;
