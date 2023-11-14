import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TouchableOpacity,
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
        <View style={styles.noSetsFound}>
          <Link href="/(modals)/set/create" asChild>
            <TouchableOpacity>
              <Text style={styles.addNewSetText}>Add new Set</Text>
            </TouchableOpacity>
          </Link>
        </View>
      ) : (
        <RenderSets />
      )}
    </View>
  );
}

const RenderSets = () => {
  const { data } = useQuery({
    queryKey: ["my-sets"],
    queryFn: getMySets,
  });
  const renderItem = useCallback(
    ({ item }: { item: { set: Set; canEdit: boolean } }) => {
      return (
        <View style={styles.setCard}>
          <View style={styles.setCardContent}>
            <Text style={styles.setCardTitle}>{item.set.title}</Text>
            <View style={styles.setCards}>
              <Text>{item.set.cards || 0} Cards</Text>
              <View style={styles.actionsContainer}>
                <Link href={`/(modals)/cards/${item.set.id}`} asChild>
                  <Ionicons name="add-circle-outline" size={16} color="blue" />
                </Link>
              </View>
            </View>
          </View>
          <View style={styles.actionsContainer}>
            <Link href={`/(modals)/set/update/${item.set.id}`} asChild>
              <Ionicons name="create-outline" size={16} color="blue" />
            </Link>
          </View>
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
  noSetsFound: {
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  addNewSetText: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 24,
  },
  setCard: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
    backgroundColor: Colors.white,
    padding: 16,
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
  },
  setCardContent: {
    flex: 1,
  },
  setCardTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  setCards: {
    flexDirection: "row",
    marginTop: 8,
    gap: 12,
  },
});
