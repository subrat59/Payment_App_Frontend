import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
} from "react-native";

import { useState } from "react";

import { useLocalSearchParams } from "expo-router";

import { BACKEND_URL } from "@/services/api";

export default function SendMoney() {


  const [receiverPhone, setReceiverPhone] =
    useState("");

  const [amount, setAmount] = useState("");

  async function handleTransfer() {
    try {
      const response = await BACKEND_URL.post(
        "/api/wallet/transfer",
        {
          receiverPhone,

          amount: Number(amount),
        }
      );

      Alert.alert(
        "Success",
        response.data.message
      );

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Failed",
        "Transfer failed"
      );
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0A0A0A",
        padding: 24,
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 32,
          fontWeight: "bold",
          marginBottom: 30,
        }}
      >
        Send Money
      </Text>

      {/* Receiver */}
      <TextInput
        placeholder="Receiver Phone Number"
        placeholderTextColor="#71717A"
        value={receiverPhone}
        onChangeText={setReceiverPhone}
        style={{
          backgroundColor: "#18181B",
          color: "white",
          padding: 18,
          borderRadius: 16,
          marginBottom: 20,
        }}
      />

      {/* Amount */}
      <TextInput
        placeholder="Enter Amount"
        placeholderTextColor="#71717A"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={{
          backgroundColor: "#18181B",
          color: "white",
          padding: 18,
          borderRadius: 16,
          marginBottom: 30,
        }}
      />

      {/* Button */}
      <Pressable
        onPress={handleTransfer}
        style={{
          backgroundColor: "#10B981",
          padding: 18,
          borderRadius: 16,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Send Money
        </Text>
      </Pressable>
    </View>
  );
}