import { useEffect } from "react";

import {
  View,
  ActivityIndicator,
} from "react-native";

import AsyncStorage from
"@react-native-async-storage/async-storage";

import { router } from "expo-router";

export default function Index() {

  useEffect(() => {

    checkLogin();

  }, []);

  async function checkLogin() {

    try {

      // Get token
      const token =
        await AsyncStorage.getItem("token");

      // If logged in
      console.log("index",token)
      if (token) {

        router.replace("/tabs/home");

      } else {

        router.replace("/login");
      }

    } catch (error) {

      console.log(error);

      router.replace("/login");
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0A0A0A",
      }}
    >
      <ActivityIndicator
        size="large"
        color="white"
      />
    </View>
  );
}