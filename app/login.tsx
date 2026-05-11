import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
} from "react-native";

import { useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { router } from "expo-router";

import { BACKEND_URL } from "@/services/api";
import axios from "axios";

export default function Login() {

  const [phone, setPhone] = useState("");

  async function handleContinue() {

    console.log("hi", phone);

    try {
      console.log(
  "API URL:",
  process.env.EXPO_PUBLIC_API_URL
);
      const response =
        await BACKEND_URL.post(
          "/api/users/check-user",
          {
            phone,
          }
        );
        console.log("hhhh",response)
      // User exists
      if (response.data.exists) {

        // Save JWT token
        await AsyncStorage.setItem(
          "token",
          response.data.token
        );
        console.log(response.data.token)

        // Navigate to home
        router.replace("/tabs/home");

      } else {

        // Go to signup
        router.push("/signup");
      }

    } catch (error) {

      console.log("h", error);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0A0A0A",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 32,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Login
      </Text>

      <TextInput
        placeholder="Enter Phone Number"
        placeholderTextColor="#71717A"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        style={{
          backgroundColor: "#18181B",
          color: "white",
          padding: 18,
          borderRadius: 16,
          marginBottom: 20,
        }}
      />

      <Pressable
        onPress={handleContinue}
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
            fontWeight: "600",
          }}
        >
          Continue
        </Text>
      </Pressable>
    </View>
  );
}