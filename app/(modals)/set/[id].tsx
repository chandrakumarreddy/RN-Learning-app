import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { addToFavorites, getSet } from "../../../data/api";
import { defaultStyleSheet } from "../../../constants/styles";
import Colors from "../../../constants/Colors";

const windowWidth = Dimensions.get("window").width;

export default function SetModal() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isLoading, data } = useQuery({
    queryKey: [`get-set-${id}`],
    queryFn: () => getSet(id),
    enabled: !!id,
  });
  return (
    <View style={defaultStyleSheet.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <SetItem />
      )}
    </View>
  );
}

const SetItem = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data } = useQuery({
    queryKey: [`get-set-${id}`],
    queryFn: () => getSet(id),
  });
  if (!data) {
    return null;
  }
  const onClickAddToFavourites = async () => {
    await addToFavorites(id);
    router.replace("/(tabs)/sets");
  };
  return (
    <View style={styles.setContainer}>
      <View style={styles.setBody}>
        <View>
          <Text style={styles.setTitle}>{data.title}</Text>
          <Text style={styles.setBodyText}>{data.cards} Cards</Text>
        </View>
        <Image
          source={{
            uri: "https://i.pinimg.com/originals/71/28/3b/71283bb49db55cfee5bb6acd1389c465.jpg",
          }}
          width={windowWidth - 32}
          height={200}
          borderRadius={8}
        />
        <Text style={styles.setBodyText}>{data.description}</Text>
      </View>
      <TouchableOpacity
        style={defaultStyleSheet.button}
        onPress={onClickAddToFavourites}
      >
        <Text style={defaultStyleSheet.buttonText}>Add to favourites</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  setContainer: {
    padding: 16,
    paddingBottom: 24,
    flex: 1,
  },
  setTitle: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 4,
  },
  setBodyText: {
    fontSize: 14,
  },
  setBody: {
    flex: 1,
    gap: 16,
  },
});
