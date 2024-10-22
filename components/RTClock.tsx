import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions  } from 'react-native';

const { width: screenWidth } = Dimensions.get('window'); // Get screen width

const RealTimeClock = () => {  
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date()); // Update the state with the current date and time every second
    }, 1000);

    return () => clearInterval(timer); // Clean up the interval when the component is unmounted
  }, []);

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
    return date.toLocaleString(undefined, options); // Formats the date and time to a readable string
  };

  // Split the formatted date and time
  const formattedDateTime = formatDateTime(currentDateTime).split('at ');
  const date = formattedDateTime[0]; // First part is the date
  const time = formattedDateTime[1]; // Second part is the time

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{date}</Text>  {/* Smaller date text */}
      <Text style={styles.timeText}>{time}</Text>  {/* Larger time text */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282c34', // Dark background for contrast
    padding: 20,
  },
  dateText: {
    fontSize: 24, // Smaller font size for the date
    color: '#61dafb', // Light blue color for text
    textAlign: 'center',
    padding: 5,
  },
  timeText: {
    fontSize: 36, // Larger font size for the time
    fontWeight: 'bold',
    color: '#61dafb', // Light blue color for text
    textAlign: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#1c1e22', // Darker background for the text
    overflow: 'hidden', // Ensures rounded corners are respected
    shadowColor: '#000', // Adds a shadow effect
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Android shadow
  },
});

export default RealTimeClock;
