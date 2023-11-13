import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSets, Set } from "../../data/api";
import { defaultStyleSheet } from "../../constants/styles";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function Search() {
  const { isLoading } = useQuery({
    queryKey: ["sets"],
    queryFn: getSets,
  });
  return (
    <View style={defaultStyleSheet.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <RenderSets />
      )}
    </View>
  );
}

const RenderSets = () => {
  const { data } = useQuery({ queryKey: ["sets"], queryFn: getSets });
  const renderItem: ListRenderItem<Set> = useCallback(
    ({ item }) => (
      <Link href={`/(modals)/set/${item.id}`} asChild>
        <TouchableOpacity style={styles.setsContainer}>
          <View style={styles.setsContent}>
            <Image
              source={{
                uri: "https://i.pinimg.com/originals/71/28/3b/71283bb49db55cfee5bb6acd1389c465.jpg",
              }}
              width={35}
              height={35}
              borderRadius={8}
            />
            <View>
              <Text style={styles.rowTitle}>{item.title}</Text>
              <Text style={styles.cardTitle}>{item.cards} Cards</Text>
            </View>
          </View>
          <Ionicons
            name="chevron-forward-circle-outline"
            size={20}
            color="#666"
          />
        </TouchableOpacity>
      </Link>
    ),
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
  setsContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
  },
  setsContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 2,
  },
  cardTitle: {
    fontSize: 12,
  },
});
