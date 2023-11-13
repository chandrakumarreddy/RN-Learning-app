import { View, Text } from "react-native";
import React from "react";
import { getMySets } from "../../data/api";
import { useQuery } from "@tanstack/react-query";

export default function Sets() {
  const { data } = useQuery({
    queryKey: ["my-sets"],
    queryFn: getMySets,
  });
  return (
    <View>
      <Text>Sets</Text>
    </View>
  );
}
