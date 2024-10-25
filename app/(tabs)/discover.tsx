import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update the time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  // Function to get the current day of the week in Vietnamese
  const getVietnameseDay = (dayIndex) => {
    const days = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
    return days[dayIndex];
  };

  // Format the date in Vietnamese (e.g., 24 Tháng 10 2023)
  const getFormattedDate = () => {
    const monthNames = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];
    const day = currentTime.getDate();
    const month = monthNames[currentTime.getMonth()];
    const year = currentTime.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const data = [50, 10, 40, 95, 85, 35, 25, 50, 70, 80];

  return (
    <ScrollView style={styles.container}>
      {/* Header with dynamic date */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hôm nay, {getVietnameseDay(currentTime.getDay())}</Text>
        <Text style={styles.headerDate}>{getFormattedDate()}</Text>
      </View>

      {/* Sleep stats */}
      <View style={styles.statsBox}>
        <View style={styles.statsRow}>
          {["5h", "5h", "5h", "5h", "5h"].map((hour, index) => (
            <View key={index} style={styles.statCircle}>
              <Text style={styles.statText}>{hour}</Text>
              <Text style={styles.statSubText}>Wd</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Sleep Time & Quality */}
      <View style={styles.infoRow}>
        <View style={styles.infoBox1}>
          <Text style={styles.infoTitle}>Thời gian ngủ trung bình 1 tuần</Text>
          <Text style={styles.infoValue}>6.2</Text>
          <Text style={styles.infoUnit}>giờ/ngày</Text>
        </View>
        <View style={styles.infoBox2}>
          <Text style={styles.infoTitle}>Chất lượng giấc ngủ</Text>
          {/* <ProgressCircle style={styles.circleProgress} progress={0.75} progressColor={'green'} /> */}
          <Text style={styles.infoStatus}>Tốt</Text>
        </View>
      </View>

      {/* Recent Sleep Info */}
      <View style={styles.recentSleepInfo}>
        <Text style={styles.recentSleepTimeTitle}>Thông tin giấc ngủ gần đây</Text>
        <Text style={styles.recentSleepTime}>10:12 Bắt đầu ngủ</Text>
        <Text style={styles.recentSleepTime}>07:12 Bắt đầu dậy</Text>
        <Text style={styles.recentSleepDuration}>6h 52m Tổng thời gian đã ngủ</Text>
      </View>

      {/* Tips for Sleep */}
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
    fontSize: 16,
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
  circleProgress: {
    marginTop: 10,
    height: 100,
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
  footerNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
});
