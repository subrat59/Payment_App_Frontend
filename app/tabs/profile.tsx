import {
  View,
  Text,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";

import { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { router } from "expo-router";

import {
  LogOut,
  User,
  Phone,
} from "lucide-react-native";

import { BACKEND_URL } from "@/services/api";

export default function Profile() {

  const [user, setUser] = useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  // Fetch current user
  async function fetchUser() {

    try {

      const response =
        await BACKEND_URL.get(
          "/api/users/me"
        );

      setUser(response.data.user);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  // Logout
  async function handleLogout() {

    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },

        {
          text: "Logout",

          style: "destructive",

          onPress: async () => {

            await AsyncStorage.removeItem(
              "token"
            );

            router.replace("/login");
          },
        },
      ]
    );
  }

  if (loading) {

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#0A0A0A",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator
          size="large"
          color="#10B981"
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0A0A0A",
        padding: 24,
      }}
    >

      {/* Heading */}
      <Text
        style={{
          color: "white",
          fontSize: 34,
          fontWeight: "bold",
          marginTop: 60,
          marginBottom: 30,
        }}
      >
        Profile
      </Text>

      {/* User Card */}
      <View
        style={{
          backgroundColor: "#18181B",

          borderRadius: 28,

          padding: 24,

          marginBottom: 30,
        }}
      >

        {/* Avatar */}
        <View
          style={{
            width: 80,
            height: 80,

            borderRadius: 40,

            backgroundColor: "#10B981",

            justifyContent: "center",

            alignItems: "center",

            marginBottom: 20,
          }}
        >
          <User
            color="white"
            size={36}
          />
        </View>

        {/* Name */}
        <Text
          style={{
            color: "white",

            fontSize: 26,

            fontWeight: "bold",
          }}
        >
          {user?.full_name}
        </Text>

        {/* Phone */}
        <View
          style={{
            flexDirection: "row",

            alignItems: "center",

            marginTop: 14,
          }}
        >
          <Phone
            color="#71717A"
            size={18}
          />

          <Text
            style={{
              color: "#A1A1AA",

              marginLeft: 10,

              fontSize: 15,
            }}
          >
            {user?.phone}
          </Text>
        </View>

      </View>

      {/* Logout Button */}
      <Pressable
        onPress={handleLogout}

        style={{
          backgroundColor: "#DC2626",

          padding: 18,

          borderRadius: 22,

          flexDirection: "row",

          justifyContent: "center",

          alignItems: "center",

          gap: 12,
        }}
      >
        <LogOut
          color="white"
          size={22}
        />

        <Text
          style={{
            color: "white",

            fontSize: 17,

            fontWeight: "bold",
          }}
        >
          Logout
        </Text>
      </Pressable>

    </View>
  );
}