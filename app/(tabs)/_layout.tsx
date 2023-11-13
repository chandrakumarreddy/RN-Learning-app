import { StatusBar, TouchableOpacity } from "react-native";
import React, { Fragment } from "react";
import { Link, Tabs } from "expo-router";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Fragment>
      <StatusBar barStyle="light-content" />
      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
          tabBarActiveTintColor: Colors.primary,
        }}
      >
        <Tabs.Screen
          name="sets"
          options={{
            title: "My Sets",
            tabBarIcon: ({ size, color }) => (
              <Ionicons size={size} color={color} name="home-outline" />
            ),
            headerRight: () => (
              <Link href="/(modals)/set/create" asChild>
                <TouchableOpacity style={{ marginRight: 15 }}>
                  <Ionicons name="add-outline" size={24} color={Colors.white} />
                </TouchableOpacity>
              </Link>
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="search-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </Fragment>
  );
}
