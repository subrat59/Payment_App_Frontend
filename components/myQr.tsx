import {
  View,
  Text,
} from "react-native";

import QRCode from
"react-native-qrcode-svg";

import {
  useEffect,
  useState,
} from "react";

import { BACKEND_URL }
from "@/services/api";

export default function MyQR() {

  const [user, setUser] =
    useState<any>(null);

  async function fetchUser() {

    try {

      const response =
        await BACKEND_URL.get(
          "/api/users/me"
        );

      setUser(response.data.user);

    } catch (error) {

      console.log(error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) return null;

  return (
    <View
      style={{
        backgroundColor: "#18181B",

        marginTop: 24,

        borderRadius: 28,

        padding: 24,

        alignItems: "center",
      }}
    >

      {/* Heading */}
      <Text
        style={{
          color: "white",

          fontSize: 22,

          fontWeight: "bold",

          marginBottom: 20,
        }}
      >
        Scan & Pay
      </Text>

      {/* QR */}
      <View
        style={{
          backgroundColor: "white",

          padding: 16,

          borderRadius: 20,
        }}
      >
        <QRCode
          value={`payflow://pay?userId=${user.id}`}

          size={220}
        />
      </View>

      {/* Name */}
      <Text
        style={{
          color: "white",

          marginTop: 20,

          fontSize: 18,

          fontWeight: "600",
        }}
      >
        {user.full_name}
      </Text>

      {/* Phone */}
      <Text
        style={{
          color: "#A1A1AA",

          marginTop: 6,
        }}
      >
        {user.phone}
      </Text>

    </View>
  );
}