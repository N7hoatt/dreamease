import React from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity,  StyleSheet, Button } from 'react-native';
import { useState, useEffect } from 'react';

type Props = {}

const Page = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#000022', padding: 20 }}>
      {/* Date and Day */}
      <Text style={{ color: '#fff', fontSize: 18 }}>Hôm nay, Thứ 7</Text>
      <Text style={{ color: '#bbb', fontSize: 14 }}>24 Tháng tư 2023</Text>

      {/* Sleep Icons */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
        {[1, 2, 3, 4, 5].map((_, index) => (
          <View key={index} style={{ alignItems: 'center' }}>
            <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#fff' }}>5h</Text>
            </View>
            <Text style={{ color: '#bbb' }}>Wd</Text>
          </View>
        ))}
      </View>

      {/* Average Sleep */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
        <Text style={{ color: '#fff' }}>Thời gian ngủ trung bình</Text>
        <Text style={{ color: '#fff' }}>6.2 giờ/ngày</Text>
      </View>

      {/* Recent Sleep Info */}
      <View style={{ marginVertical: 20 }}>
        <Text style={{ color: '#fff' }}>Thông tin của giấc ngủ gần đây</Text>
        <Text style={{ color: '#bbb' }}>10:12 - Bắt đầu ngủ</Text>
        <Text style={{ color: '#bbb' }}>07:12 - Bắt đầu dậy</Text>
        <Text style={{ color: '#bbb' }}>Tổng thời gian: 6h 52m</Text>
      </View>

      {/* Sleep Tips */}
      <TouchableOpacity style={{ padding: 20, backgroundColor: '#111', borderRadius: 10 }}>
        <Text style={{ color: '#fff', textAlign: 'center' }}>Các tips cho giấc ngủ</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Page;