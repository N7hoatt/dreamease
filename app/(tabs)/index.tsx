import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Button } from 'react-native';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

type Props = {}

const Page = (props: Props) => {
  return (
    <ScrollView style={styles.container}>
    {/* Profile Section */}
    <View style={styles.profileSection}>
      <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.avatar} />
      <Text style={styles.greeting}>Hi!</Text>
      <Text style={styles.username}>Thuan</Text>
    </View>

    {/* Horizontal Cards Section */}
    <ScrollView horizontal={true} style={styles.cardsSection}>
      <View style={styles.card}>
        <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.cardImage} />
        <Text style={styles.cardText}>Riding in the horse</Text>
      </View>
      <View style={styles.card}>
        <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.cardImage} />
        <Text style={styles.cardText}>Space noise</Text>
      </View>
      <View style={styles.card}>
        <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.cardImage} />
        <Text style={styles.cardText}>Caution zone</Text>
      </View>
    </ScrollView>

    {/* Chart Section */}
    <Text style={styles.sectionTitle}>Biểu đồ giấc ngủ</Text> 
    <Text style={styles.sectionSubTitle}>Weekly sleep</Text>

    {/* Tabs Section */}
    <View style={styles.tabsSection}>
      <Button title="Days" onPress={() => {}} />
      <Button title="Weeks" onPress={() => {}}/>
      <Button title="Months" onPress={() => {}} />
      <Button title="All" onPress={() => {}} />
    </View>
  </ScrollView>
);
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d27',
    paddingHorizontal: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  greeting: {
    fontSize: 20,
    color: 'white',
  },
  username: {
    fontSize: 24,
    color: 'white',
  },
  cardsSection: {
    flexDirection: 'row',
    marginTop: 20,
  },
  card: {
    marginRight: 10,
    alignItems: 'center',
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  cardText: {
    color: 'white',
    marginTop: 5,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    marginTop: 20,
  },
  sectionSubTitle: {
    color: '#AAAAAA',
    fontSize: 16,
  },
  chart: {
    marginVertical: 20,
    borderRadius: 10,
  },
  tabsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});