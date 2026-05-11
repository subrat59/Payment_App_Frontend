import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";

import { useEffect, useState } from "react";

import { router } from "expo-router";

import { COLORS } from "@/constants/colors";

import { BACKEND_URL } from "@/services/api";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";

export default function WalletCard() {

  const [balance, setBalance] = useState(0);

  const [loading, setLoading] = useState(true);

  async function fetchBalance() {
    try {

      const response = await BACKEND_URL.get(
        `/api/wallet/fetchbalance`
      );

      console.log(response.data);

      setBalance(response.data.balance);

    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
  React.useCallback(() => {

    fetchBalance();

  }, [])
);
  return (
    <View
      style={{
        backgroundColor: COLORS.primary,
        borderRadius: 28,
        padding: 24,
        marginTop: 30,
      }}
    >
      <Text
        style={{
          color: "white",
          opacity: 0.9,
        }}
      >
        Available Balance
      </Text>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="white"
          style={{
            marginTop: 20,
          }}
        />
      ) : (
        <Text
          style={{
            color: "white",
            fontSize: 38,
            fontWeight: "bold",
            marginTop: 10,
          }}
        >
          ₹ {balance}
        </Text>
      )}

      <Pressable
        onPress={() => router.push("/add-money")}
        style={{
          backgroundColor: "rgba(255,255,255,0.2)",
          alignSelf: "flex-start",
          paddingHorizontal: 18,
          paddingVertical: 10,
          borderRadius: 14,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "600",
          }}
        >
          Add Money
        </Text>
      </Pressable>
    </View>
  );
}