import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { getAverageSleepLast7Days, getLast7DaysSleepData, getClosestSleep } from '@/components/SleepCalculator';
import { useUser } from '../UserContext';
import { DocumentData } from 'firebase/firestore';

export default function App() {
  const { userId } = useUser() || { userId: null };
  const [currentTime, setCurrentTime] = useState(new Date());
  const [averageSleep, setAverageSleep] = useState<number | null>(null);
  const [sleepStats, setSleepStats] = useState<DocumentData[]>([]);
  const [closestSleep, setClosestSleep] = useState<DocumentData | null>(null);
  const updateInterval = 3 * 1000; // Refresh interval for demo

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          const [avgSleep, sleepData, closest] = await Promise.all([
            getAverageSleepLast7Days(userId),
            getLast7DaysSleepData(userId),
            getClosestSleep(userId)
          ]);

          setAverageSleep(avgSleep ?? null);
          setSleepStats(sleepData ?? []);
          setClosestSleep(closest ?? null);
        } catch (error) {
          console.error("Error fetching sleep data:", error);
        }
      };

      fetchData(); // Initial fetch

      // Set interval to refresh data
      const interval = setInterval(fetchData, updateInterval);
      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [userId]);

  const getVietnameseDay = (dayIndex: number) => {
    const days = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
    return days[dayIndex];
  };

  const getFormattedDate = () => {
    const monthNames = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];
    const day = currentTime.getDate();
    const month = monthNames[currentTime.getMonth()];
    const year = currentTime.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const getSleepQuality = () => {
    if (averageSleep === null) return { status: "Loading...", color: "white" };
    if (averageSleep >= 8.0) return { status: "Tốt", color: "green" };
    if (averageSleep >= 7.0 && averageSleep < 8.0) return { status: "Đủ", color: "yellow" };
    return { status: "Thiếu", color: "red" };
  };

  const sleepQuality = getSleepQuality();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hôm nay, {getVietnameseDay(currentTime.getDay())}</Text>
        <Text style={styles.headerDate}>{getFormattedDate()}</Text>
      </View>

      <View style={styles.statsBox}>
        <View style={styles.statsRow}>
          {sleepStats.length > 0 ? (
            sleepStats.map((data, index) => (
              <View key={index} style={styles.statCircle}>
                <Text style={styles.statText}>{data.duration}h</Text>
                <Text style={styles.statSubText}>{getVietnameseDay(new Date(data.date).getDay())}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.loadingText}>Loading...</Text>
          )}
        </View>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoBox1}>
          <Text style={styles.infoTitle}>Thời gian ngủ trung bình 1 tuần</Text>
          <Text style={[styles.infoValue, { color: sleepQuality.color }]}>
            {averageSleep !== null ? `${averageSleep.toFixed(1)}` : 'Loading...'}
          </Text>
          <Text style={styles.infoUnit}>giờ/ngày</Text>
        </View>
        <View style={styles.infoBox2}>
          <Text style={styles.infoTitle}>Chất lượng giấc ngủ</Text>
          <Text style={[styles.infoStatus, { color: sleepQuality.color }]}>{sleepQuality.status}</Text>
        </View>
      </View>

      <View style={styles.recentSleepInfo}>
        <Text style={styles.recentSleepTimeTitle}>Thông tin giấc ngủ gần nhất</Text>
        {closestSleep ? (
          <>
            <Text style={styles.recentSleepTime}>Bắt đầu ngủ: {closestSleep.startTime}</Text>
            <Text style={styles.recentSleepTime}>Thức dậy: {closestSleep.endTime}</Text>
            <Text style={styles.recentSleepDuration}>Tổng thời gian đã ngủ: {closestSleep.duration} giờ</Text>
          </>
        ) : (
          <Text style={styles.loadingText}>Loading...</Text>
        )}
      </View>

      <View style={styles.tipsSection}>
        <MaterialIcons name="lightbulb-outline" size={24} color="white" />
        <Text style={styles.tipsText}>Các tips cho giấc ngủ</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00002E',
    padding: 16,
  },
  header: {
    marginTop: 0,
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 20,
    color: 'white',
  },
  headerDate: {
    fontSize: 16,
    color: 'white',
    marginTop: 8,
  },
  statsBox: {
    backgroundColor: '#14142E',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
  },
  statCircle: {
    alignItems: 'center',
  },
  statText: {
    color: 'white',
    fontSize: 20,
  },
  statSubText: {
    color: 'gray',
    fontSize: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoBox1: {
    backgroundColor: '#14142E',
    padding: 20,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
  },
  infoBox2: {
    backgroundColor: '#14142E',
    padding: 20,
    borderRadius: 10,
    flex: 1,
  },
  infoTitle: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  infoStatus: {
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
    fontSize: 32,
  },
  infoValue: {
    color: 'white',
    fontSize: 36,
    marginTop: 10,
    textAlign: 'center',
  },
  infoUnit: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  recentSleepTimeTitle: {
    textAlign: 'justify',
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
  },
  recentSleepInfo: {
    backgroundColor: '#292D63',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  recentSleepTime: {
    color: 'white',
    fontSize: 16,
  },
  recentSleepDuration: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
  },
  tipsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4D53B9',
    padding: 20,
    borderRadius: 10,
  },
  tipsText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  loadingText: {
    color: 'white',
    fontSize: 24,
  },
});
