import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";

import {
  useEffect,
  useState,
} from "react";

import {
  Bell,
} from "lucide-react-native";

import { BACKEND_URL } from "@/services/api";

import { supabase } from "@/services/supabase";


export default function Notifications() {

  const [notifications, setNotifications] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);


  // Fetch old notifications
  async function fetchNotifications() {

    try {

      const response =
        await BACKEND_URL.get(
          "/api/notifications"
        );

        console.log("Notif",response)

      setNotifications(
        response.data.notifications
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  }


  useEffect(() => {

    fetchNotifications();


    // Realtime subscription
    const channel = supabase
      .channel("notifications-channel")

      .on(
        "postgres_changes",
        {
          event: "INSERT",

          schema: "public",

          table: "notifications",
        },

        (payload) => {

          console.log(
            "New Notification:",
            payload
          );

          // Add newest notification on top
          setNotifications((prev) => [
            payload.new,
            ...prev,
          ]);
        }
      )

      .subscribe();


    // Cleanup
    return () => {
      supabase.removeChannel(channel);
    };

  }, []);


  function renderItem({ item }: any) {

    return (
      <View
        style={{
          backgroundColor: "#18181B",

          padding: 18,

          borderRadius: 20,

          marginBottom: 14,

          flexDirection: "row",

          alignItems: "flex-start",

          gap: 14,
        }}
      >

        {/* Icon */}
        <View
          style={{
            width: 42,
            height: 42,

            borderRadius: 21,

            backgroundColor: "#10B981",

            justifyContent: "center",

            alignItems: "center",
          }}
        >
          <Bell
            color="white"
            size={20}
          />
        </View>


        {/* Text */}
        <View
          style={{
            flex: 1,
          }}
        >

          <Text
            style={{
              color: "white",

              fontSize: 16,

              fontWeight: "700",
            }}
          >
            {item.title}
          </Text>


          <Text
            style={{
              color: "#A1A1AA",

              marginTop: 6,

              lineHeight: 22,
            }}
          >
            {item.message}
          </Text>


          <Text
            style={{
              color: "#71717A",

              marginTop: 10,

              fontSize: 12,
            }}
          >
            {new Date(
              item.created_at
            ).toLocaleString()}
          </Text>

        </View>

      </View>
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
        padding: 20,
      }}
    >

      {/* Heading */}
      <Text
        style={{
          color: "white",

          fontSize: 32,

          fontWeight: "bold",

          marginTop: 50,

          marginBottom: 24,
        }}
      >
        Notifications
      </Text>


      {/* List */}
      <FlatList
        data={notifications}

        keyExtractor={(item) => item.id}

        renderItem={renderItem}

        showsVerticalScrollIndicator={false}
      />

    </View>
  );
}