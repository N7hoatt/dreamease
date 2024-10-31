import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from '../app/firebase/authService';
import { useUser } from "../app/UserContext";

// Helper function to get the date 7 days ago
const getDateSevenDaysAgo = () => {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  return date;
};

// Function to calculate average sleep duration for the last 7 days
export const getAverageSleepLast7Days = async (userId: string) => {
  try {
    if (!userId) {
      console.error("User ID is not available");
      return;
    }

    const sevenDaysAgo = getDateSevenDaysAgo();
    const sleepDataRef = collection(db, `users/${userId}/sleepDate`);
    const querySnapshot = await getDocs(sleepDataRef);

    let totalDuration = 0;
    let count = 0;

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const sleepDate = new Date(data.date);

      // Include only entries from the last 7 days
      if (sleepDate >= sevenDaysAgo && data.duration) {
        totalDuration += data.duration;
        count += 1;
      }
    });

    // Calculate the average sleep duration for the last 7 days
    const averageSleep = count > 0 ? totalDuration / count : null;
    console.log(`Average sleep per day for the last 7 days for user ${userId}: ${averageSleep} hours`);
    return averageSleep;
  } catch (error) {
    console.error("Error calculating average sleep for the last 7 days:", error);
    throw error;
  }
};

// Function to fetch last 7 days of sleep data for a specific user
export const getLast7DaysSleepData = async (userId: string) => {
  try {
    if (!userId) {
      console.error("User ID is not available");
      return;
    }

    const sleepDataRef = collection(db, `users/${userId}/sleepDate`);

    // Query to fetch the latest 7 entries ordered by date
    const sleepQuery = query(sleepDataRef, orderBy("date"), limit(7));
    const querySnapshot = await getDocs(sleepQuery);

    // Extract data and filter to unique dates
    const sleepData = [];
    const dateSet = new Set(); // To track unique dates

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const sleepDate = new Date(data.date).toDateString(); // Format date as a string to ensure uniqueness

      // Add to result only if the date is not already in the set
      if (!dateSet.has(sleepDate)) {
        dateSet.add(sleepDate); // Mark this date as seen
        sleepData.push(data); // Add the unique entry to the result
      }
    });

    // Reverse to show data from oldest to most recent in the UI
    return sleepData;
  } catch (error) {
    console.error("Error fetching last 7 days of sleep data:", error);
    throw error;
  }
};


// Function to get the closest sleep entry
export const getClosestSleep = async (userId: string) => {
  try {
    if (!userId) {
      console.error("User ID is not available");
      return;
    }

    const sleepDataRef = collection(db, `users/${userId}/sleepSection`);

    // Query to get the latest entry ordered by date in descending order
    const closestSleepQuery = query(sleepDataRef, orderBy("endTime"), limit(1));
    const querySnapshot = await getDocs(closestSleepQuery);

    // Check if there's a document and return the closest entry
    if (!querySnapshot.empty) {
      console.log("Closest sleep entry:", querySnapshot.docs[0].data());
      return querySnapshot.docs[0].data();
    } else {
      console.log("No sleep data available");
      return null; // No sleep data available
    }
  } catch (error) {
    console.error("Error fetching closest sleep entry:", error);
    throw error;
  }
};
