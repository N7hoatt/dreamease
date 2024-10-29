import React from 'react'
import { Tabs } from 'expo-router'
import { TabBar } from '@/components/TabBar'

const TabLayout = () => {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Timer",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Report",
        }}
      />
    </Tabs>
  )
}

export default TabLayout