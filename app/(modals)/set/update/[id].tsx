import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Switch,
  TextInput,
  Dimensions,
  StyleSheet,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { deleteSet, getSet } from "../../../../data/api";
import { defaultStyleSheet } from "../../../../constants/styles";
import { Ionicons } from "@expo/vector-icons";

export default function UpdateSet() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [information, setInformation] = useState({
    title: "",
    description: "",
    isPrivate: false,
    image: "",
  });
  const { isLoading, data } = useQuery({
    queryKey: [`get-set-${id}`],
    queryFn: () => getSet(id),
    enabled: !!id,
  });
  useEffect(() => {
    if (data) {
      setInformation(data);
    }
  }, [data]);
  const onDeleteSet = useCallback(async () => {
    await deleteSet(id);
    router.replace("/(tabs)/sets");
  }, []);
  if (isLoading || !data) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }
  return (
    <View style={[defaultStyleSheet.container, { padding: 16 }]}>
      <TouchableOpacity style={styles.deleteIcon} onPress={onDeleteSet}>
        <Ionicons name="trash-outline" size={20} color="red" />
        <Text style={styles.deleteIconText}>Delete</Text>
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        <TextInput
          placeholder="Title"
          style={defaultStyleSheet.input}
          value={information.title}
          onChangeText={(text) =>
            setInformation((s) => ({ ...s, title: text }))
          }
        />
        <TextInput
          placeholder="Description"
          style={defaultStyleSheet.input}
          value={information.description}
          onChangeText={(text) =>
            setInformation((s) => ({ ...s, description: text }))
          }
        />
        <View style={styles.privateSwitchContainer}>
          <Switch
            value={information.isPrivate}
            onValueChange={(val) =>
              setInformation((s) => ({ ...s, isPrivate: val }))
            }
          />
          <Text>Private</Text>
        </View>
        <TouchableOpacity style={defaultStyleSheet.button}>
          <Text style={defaultStyleSheet.buttonText}>Upload Image</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.createButtonContainer}>
        <TouchableOpacity style={defaultStyleSheet.bottomButton}>
          <Text style={defaultStyleSheet.buttonText}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  createButtonContainer: {
    alignItems: "center",
  },
  privateSwitchContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  deleteIcon: {
    marginBottom: 12,
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  deleteIconText: {
    color: "red",
    fontWeight: "500",
    alignSelf: "flex-end",
  },
});
