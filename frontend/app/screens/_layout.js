import React from 'react'
import { Tabs } from 'expo-router/tabs'
import { AntDesign, Ionicons } from '@expo/vector-icons';

export default function AppLayout () {
  return (
    <Tabs>
      <Tabs.Screen name = "splash" options = {{
        href : null,
        headerShown : false,
        tabBarStyle : { display : "none" },
      }} />
      <Tabs.Screen name = "signup" options = {{
        href : null,
        headerShown : false,
        tabBarStyle : { display : "none" },
      }} />
      <Tabs.Screen name = "login" options = {{
        href : null,
        headerShown : false,
        tabBarStyle : { display : "none" },
      }} />
      <Tabs.Screen name = "home" options = {{
        href : "/screens/home",
        headerShown : false,
        tabBarLabel : "Home",
        tabBarLabelStyle : {fontSize : 1},
        tabBarIcon : ({ focused }) => {
          return focused ?
            <Ionicons name = "home" size = {36} color = "#FEE2E2" />
          : <AntDesign name = "home" size = {24} color = "#FEE2E2" />
        },
        tabBarStyle : {borderRadius : 21, backgroundColor : "#EF4444", height : 58, bottom : 6, marginHorizontal : 7},
        tabBarActiveTintColor : "#FEE2E2",
        tabBarInactiveTintColor : "#FEE2E2",
      }} />
      <Tabs.Screen name = "menu" options = {{
        href : "/screens/menu",
        headerShown : false,
        tabBarLabel : "Menu",
        tabBarLabelStyle : {fontSize : 1},
        tabBarIcon : ({ focused }) => {
          return <Ionicons name = {focused ? "menu" : "list-outline"} size={focused ? 36 : 24} color="#FEE2E2" />
        },
        tabBarStyle : {borderRadius : 21, backgroundColor : "#EF4444", height : 58, bottom : 6, marginHorizontal : 7},
        tabBarActiveTintColor : "#FEE2E2",
        tabBarInactiveTintColor : "#FEE2E2",
      }} />
      <Tabs.Screen name = "profile" options = {{
        href : "/screens/profile",
        headerShown : false,
        tabBarLabel : "Profile",
        tabBarLabelStyle : {fontSize : 1},
        tabBarIcon : ({ focused }) => {
          return focused ?
          <Ionicons name = "person" size = {36} color = "#FEE2E2" /> :
          <AntDesign name = "user" size = {24} color = "#FEE2E2" />
        },
        tabBarStyle : {borderRadius : 21, backgroundColor : "#EF4444", height : 58, bottom : 6, marginHorizontal : 7},
        tabBarActiveTintColor : "#FEE2E2",
        tabBarInactiveTintColor : "#FEE2E2",
      }} />
      <Tabs.Screen name = "orders" options = {{
        href : "/screens/orders",
        headerShown : false,
        tabBarLabel : "Orders",
        tabBarLabelStyle : {fontSize : 1},
        tabBarIcon : ({ focused }) => {
          return focused ?
          <Ionicons name = "cart" size = {36} color = "#FEE2E2" /> :
          <AntDesign name = "shoppingcart" size = {24} color = "#FEE2E2" />
        },
        tabBarStyle : {borderRadius : 21, backgroundColor : "#EF4444", height : 58, bottom : 6, marginHorizontal : 7},
        tabBarActiveTintColor : "#FEE2E2",
        tabBarInactiveTintColor : "#FEE2E2",
      }} />
    </Tabs>
  )
}
