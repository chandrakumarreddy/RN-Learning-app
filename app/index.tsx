import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_STORAGE_KEY } from "../data/api";
import { Redirect } from "expo-router";

export default function Page() {
  const [hasId, setHasId] = useState(false);
  useEffect(() => {
    async function load() {
      const id = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (!id) {
        const randomId = Math.random().toString(36);
        await AsyncStorage.setItem(USER_STORAGE_KEY, randomId);
      }
      setHasId(true);
    }
    load();
  }, []);
  if (hasId) {
    return <Redirect href="/(tabs)/sets" />;
  }
  return <View />;
}
