import { Alert, Pressable, Text, TextInput, View } from "react-native";

import { useState } from "react";

import { useLocalSearchParams } from "expo-router";

import { router } from "expo-router";

import { BACKEND_URL } from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Signup() {
  // Receive phone from login screen
  const { phone } = useLocalSearchParams();

  const [fullName, setFullName] = useState("");

  const [email, setEmail] = useState("");

  async function handleSignup() {
    try {
      const userResponse = await BACKEND_URL.post("/api/users/create", {
        phone,
        fullName,
        email,
      });

      if (userResponse.data.token) {
        // Save JWT token
        await AsyncStorage.setItem("token", userResponse.data.token);
        console.log(userResponse.data.token);

        // Navigate to home
        router.replace("/tabs/home");
      }
      console.log(userResponse);
      Alert.alert("Success", "Account Created");

      console.log("userResp", userResponse);
    } catch (error) {
      console.log(error);

      Alert.alert("Error", "Signup failed");
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
        Create Account
      </Text>

      {/* Full Name */}
      <TextInput
        placeholder="Full Name"
        placeholderTextColor="#71717A"
        value={fullName}
        onChangeText={setFullName}
        style={{
          backgroundColor: "#18181B",
          color: "white",
          padding: 18,
          borderRadius: 16,
          marginBottom: 20,
        }}
      />

      {/* Email */}
      <TextInput
        placeholder="Email"
        placeholderTextColor="#71717A"
        value={email}
        onChangeText={setEmail}
        style={{
          backgroundColor: "#18181B",
          color: "white",
          padding: 18,
          borderRadius: 16,
          marginBottom: 20,
        }}
      />

      {/* phone */}
      <TextInput
        value={String(phone)}
        editable={false}
        style={{
          backgroundColor: "#27272A",
          color: "#A1A1AA",
          padding: 18,
          borderRadius: 16,
          marginBottom: 30,
        }}
      />

      <Pressable
        onPress={handleSignup}
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
          Create Account
        </Text>
      </Pressable>
    </View>
  );
}
