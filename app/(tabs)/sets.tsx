import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { useCallback } from "react";
import { Set, getMySets } from "../../data/api";
import { useQuery } from "@tanstack/react-query";
import { defaultStyleSheet } from "../../constants/styles";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function Sets() {
  const { data, isLoading } = useQuery({
    queryKey: ["my-sets"],
    queryFn: getMySets,
  });
  return (
    <View style={defaultStyleSheet.container}>
      {isLoading || !data ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : data.length === 0 ? (
        <View>
          <Text>Add new Set</Text>
        </View>
      ) : (
        <RenderSets />
      )}
    </View>
  );
}

const RenderSets = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["my-sets"],
    queryFn: getMySets,
  });
  const renderItem = useCallback(
    ({ item }: { item: { set: Set; canEdit: boolean } }) => {
      return (
        <View style={styles.setCard}>
          <View style={styles.setCardContent}>
            <Text style={styles.setCardTitle}>{item.set.title}</Text>
          </View>
          <Link href={`/(modals)/set/update/${item.set.id}`} asChild>
            <Ionicons name="create-outline" size={16} color="blue" />
          </Link>
        </View>
      );
    },
    []
  );
  return <FlatList data={data} renderItem={renderItem} />;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  setCard: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
    backgroundColor: Colors.white,
    padding: 16,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  setCardContent: {
    flex: 1,
  },
  setCardTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
});
