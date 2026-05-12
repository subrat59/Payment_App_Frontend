import { View, Text, Pressable } from "react-native";
import { Send, QrCode, Plus } from "lucide-react-native";
import WalletCard from "@/components/WalletCard";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "@/services/api";
import { Href, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Home() {

  const [user, setUser] = useState<any>(null);

  async function fetchUser() {

  try {

    console.log(process.env.EXPO_PUBLIC_API_URL)
    const response =
      await BACKEND_URL.get(
        "/api/users/me"
      );
    setUser(response.data.user);

  } catch (error) {

    console.log(error);
  }
}

function getGreeting() {

  const hour =
    new Date().getHours();

  if (hour < 12) {
    return "Good Morning";
  }

  if (hour < 18) {
    return "Good Afternoon";
  }

  return "Good Evening";
}

useEffect(() => {
  fetchUser();
}, []);
  
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0A0A0A",
        padding: 20,
      }}
    >
      {/* Header */}
      <Text
        style={{
          color: "white",
          fontSize: 28,
          fontWeight: "bold",
          marginTop: 50,
        }}
      >
      {getGreeting()}, {user?.full_name}
      </Text>

      <Text
        style={{
          color: "#A1A1AA",
          marginTop: 6,
        }}
      >
      </Text>
      {/* Wallet Card */}
      <WalletCard/>

      {/* Quick Actions */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 30,
        }}
      >
        <ActionButton icon={<Send color="white" size={24} />} label="Send" route="/send" />

        <ActionButton icon={<QrCode color="white" size={24} />} label="Pay" route="/tabs/scan" />

        <ActionButton icon={<Plus color="white" size={24} />} label="Add" route="/add-money" />
      </View>
    </View>
    
  );
}

function ActionButton({
  icon,
  label,
  route,
}: {
  icon: React.ReactNode;
  label: string;
  route: Href;
}) {
  return (
    <Pressable
      onPress={() => router.push(route)}
      style={{
        backgroundColor: "#18181B",
        width: 100,
        height: 100,
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {icon}

      <Text
        style={{
          color: "white",
          marginTop: 10,
          fontWeight: "600",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}