import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { defaultStyleSheet } from "../../../constants/styles";
import { Card, createCard, getCardsForSet } from "../../../data/api";
import { useLocalSearchParams, useRouter } from "expo-router";
import { queryClient } from "../../_layout";
import { useQuery } from "@tanstack/react-query";
import Colors from "../../../constants/Colors";

export default function CreateCard() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [information, setInformation] = useState({
    question: "",
    answer: "",
  });
  const { data } = useQuery({
    queryKey: ["my-card", id],
    queryFn: () => getCardsForSet(id),
    enabled: !!id,
  });
  const onAddCard = async () => {
    try {
      await createCard({ ...information, set: id });
      setInformation({
        question: "",
        answer: "",
      });
      await queryClient.invalidateQueries({ queryKey: ["my-sets"] });
      router.back();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={[defaultStyleSheet.container, { padding: 16 }]}>
      <TextInput
        style={defaultStyleSheet.input}
        placeholder="Question"
        value={information.question}
        onChangeText={(text) =>
          setInformation((s) => ({ ...s, question: text }))
        }
      />
      <TextInput
        style={defaultStyleSheet.input}
        placeholder="Answer"
        value={information.answer}
        onChangeText={(text) => setInformation((s) => ({ ...s, answer: text }))}
      />
      <TouchableOpacity style={defaultStyleSheet.button} onPress={onAddCard}>
        <Text style={defaultStyleSheet.buttonText}>Add card</Text>
      </TouchableOpacity>
      {data && (
        <View style={styles.cardsContainer}>
          {data.map((item: Card) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Question: {item.question}</Text>
              <Text>Answer: {item.answer}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardsContainer: {
    marginVertical: 16,
    gap: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  card: {
    gap: 8,
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 8,
  },
});
