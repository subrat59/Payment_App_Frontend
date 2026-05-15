import {
  View,
  Text,
  Pressable,
} from "react-native";

import {
  Send,
  QrCode,
  Plus,
} from "lucide-react-native";

import WalletCard from "@/components/WalletCard";

import {
  useEffect,
  useState,
} from "react";

import { BACKEND_URL }
from "@/services/api";

import {
  Href,
  router,
} from "expo-router";

import MyQR from
"@/components/myQr";



export default function Home() {

  const [user, setUser] =
    useState<any>(null);

  const [showQR, setShowQR] =
    useState(false);



  /*
  ==================================
  FETCH USER
  ==================================
  */

  async function fetchUser() {

    try {

      const response =
        await BACKEND_URL.get(
          "/api/users/me"
        );

      setUser(
        response.data.user
      );

    } catch (error) {

      console.log(error);
    }
  }



  /*
  ==================================
  GREETING
  ==================================
  */

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



  /*
  ==================================
  INITIAL LOAD
  ==================================
  */

  useEffect(() => {
    fetchUser();
  }, []);



  /*
  ==================================
  QR SCREEN
  ==================================
  */

  if (showQR) {

    return (

      <View
        style={{
          flex: 1,

          backgroundColor:
            "#0A0A0A",

          justifyContent:
            "center",

          padding: 24,
        }}
      >

        {/* Close Button */}
        <Pressable
          onPress={() =>
            setShowQR(false)
          }

          style={{
            position: "absolute",

            top: 60,

            right: 24,

            zIndex: 10,

            backgroundColor:
              "#18181B",

            paddingHorizontal: 18,

            paddingVertical: 10,

            borderRadius: 20,
          }}
        >
          <Text
            style={{
              color: "white",

              fontWeight: "600",
            }}
          >
            Close
          </Text>
        </Pressable>

        <MyQR />

      </View>
    );
  }



  /*
  ==================================
  HOME SCREEN
  ==================================
  */

  return (

    <View
      style={{
        flex: 1,

        backgroundColor:
          "#0A0A0A",

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
        {getGreeting()},
        {" "}
        {user?.full_name}
      </Text>



      {/* Wallet */}
      <WalletCard />



      {/* Quick Actions */}
      <View
        style={{
          flexDirection: "row",

          justifyContent:
            "space-between",

          marginTop: 30,
        }}
      >

        {/* Send */}
        <ActionButton
          icon={
            <Send
              color="white"
              size={24}
            />
          }

          label="Send"

          route="/send"
        />



        {/* MY QR */}
        <ActionButton
          icon={
            <QrCode
              color="white"
              size={24}
            />
          }

          label="My QR"

          onPress={() =>
            setShowQR(true)
          }
        />



        {/* Add Money */}
        <ActionButton
          icon={
            <Plus
              color="white"
              size={24}
            />
          }

          label="Add"

          route="/add-money"
        />

      </View>

    </View>
  );
}



/*
==================================
ACTION BUTTON
==================================
*/

function ActionButton({
  icon,
  label,
  route,
  onPress,
}: {
  icon: React.ReactNode;

  label: string;

  route?: Href;

  onPress?: () => void;
}) {

  return (

    <Pressable
      onPress={() => {

        if (onPress) {

          onPress();
        }

        else if (route) {

          router.push(route);
        }
      }}

      style={{
        backgroundColor:
          "#18181B",

        width: 100,

        height: 100,

        borderRadius: 24,

        justifyContent:
          "center",

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