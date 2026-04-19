import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

import HomeScreen from "../screens/HomeScreen";
import AlumniScreen from "../screens/AlumniScreen";
import AnnouncementScreen from "../screens/AnnouncementScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarStyle: {
          marginBottom: -10,
          height: 60,
          borderRadius: 15,
          position: "absolute",
          left: 10,
          right: 10,
          bottom: 10,
          elevation: 5,
          backgroundColor: "#fff",
        },

        tabBarActiveTintColor: "#007bff",
        tabBarInactiveTintColor: "#777",

        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === "Dashboard") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Alumni") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "Announcements") {
            iconName = focused ? "notifications" : "notifications-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={HomeScreen}
        options={{ tabBarLabel: "Dashboard" }}
      />

      <Tab.Screen
        name="Alumni"
        component={AlumniScreen}
        options={{ tabBarLabel: "Alumni" }}
      />

      <Tab.Screen
        name="Announcements"
        component={AnnouncementScreen}
        options={{ tabBarLabel: "Announcements" }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: "Profile" }}
      />
    </Tab.Navigator>
  );
}