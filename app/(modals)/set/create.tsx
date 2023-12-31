import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Switch,
  Image,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { defaultStyleSheet } from "../../../constants/styles";
import * as ImagePicker from "expo-image-picker";
import { addToFavorites, createSet } from "../../../data/api";
import { useRouter } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";

const queryClient = useQueryClient();

const windowWidth = Dimensions.get("window").width;

export default function CreateSet() {
  const router = useRouter();
  const [information, setInformation] = useState({
    title: "",
    description: "",
    isPrivate: false,
    image: "",
  });
  const uploadImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        base64: true,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });

      if (!result.canceled) {
        setInformation((s) => ({
          ...s,
          image: `data:image/jpeg;base64,${result.assets![0].base64}`,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onCreateSet = async () => {
    const newSet = await createSet(information);
    await queryClient.invalidateQueries({ queryKey: ["my-sets"] });
    await addToFavorites(newSet.id!);
    router.back();
  };
  return (
    <View style={[defaultStyleSheet.container, { padding: 16 }]}>
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
        {information.image && (
          <Image
            source={{ uri: information.image }}
            width={windowWidth - 32}
            height={200}
            borderRadius={8}
            style={{ marginBottom: 12 }}
          />
        )}
        <TouchableOpacity
          style={defaultStyleSheet.button}
          onPress={uploadImage}
        >
          <Text style={defaultStyleSheet.buttonText}>Upload Image</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.createButtonContainer}>
        <TouchableOpacity
          style={defaultStyleSheet.bottomButton}
          onPress={onCreateSet}
        >
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
  createButtonContainer: {
    alignItems: "center",
  },
  privateSwitchContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginBottom: 12,
  },
});
