import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import React, { Fragment } from "react";
import { Stack, useRouter } from "expo-router";
import Colors from "../constants/Colors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";

export const queryClient = new QueryClient();

export default function RootLayout() {
  const router = useRouter();
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar barStyle="light-content" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(modals)/set/[id]"
          options={{
            presentation: "modal",
            title: "",
            headerRight: () => (
              <TouchableOpacity onPress={router.back}>
                <Ionicons
                  name="close-circle-outline"
                  size={28}
                  color={Colors.white}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="(modals)/set/create"
          options={{
            presentation: "modal",
            title: "Create Card Set",
            headerRight: () => (
              <TouchableOpacity onPress={router.back}>
                <Ionicons
                  name="close-circle-outline"
                  size={28}
                  color={Colors.white}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="(modals)/set/update/[id]"
          options={{
            presentation: "modal",
            title: "Update Card",
            headerRight: () => (
              <TouchableOpacity onPress={router.back}>
                <Ionicons
                  name="close-circle-outline"
                  size={28}
                  color={Colors.white}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="(modals)/cards/[id]"
          options={{
            presentation: "modal",
            title: "Create Card",
            headerRight: () => (
              <TouchableOpacity onPress={router.back}>
                <Ionicons
                  name="close-circle-outline"
                  size={28}
                  color={Colors.white}
                />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
