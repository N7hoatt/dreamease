import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/FirebaseConfig";

// Helper function to get the date 7 days ago
const getDateSevenDaysAgo = () => {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  return date;
};

// Function to calculate the average sleep for the last 7 days
export const getAverageSleepLast7Days = async (userId) => {
  try {
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
    const averageSleep = count > 0 ? totalDuration / count : 0;
    console.log(`Average sleep per day for the last 7 days for user ${userId}: ${averageSleep} hours`);
    return averageSleep;
  } catch (error) {
    console.error("Error calculating average sleep for the last 7 days:", error);
    throw error;
  }
};

// Fetch last 7 days of sleep data for a specific user
export const getLast7DaysSleepData = async (userId) => {
  try {
    const sleepDataRef = collection(db, `users/${userId}/sleepDate`);
    
    // Query to fetch the latest 7 entries ordered by date
    const sleepQuery = query(sleepDataRef, orderBy("date", "desc"), limit(7));
    const querySnapshot = await getDocs(sleepQuery);

    // Map the data to an array of { duration, date } objects
    const sleepData = querySnapshot.docs.map(doc => doc.data());

    // Reverse to show data from oldest to most recent in the UI
    return sleepData.reverse();
  } catch (error) {
    console.error("Error fetching last 7 days of sleep data:", error);
    throw error;
  }
};

