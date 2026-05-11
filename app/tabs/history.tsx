import {
  View,
  Text,
  FlatList,
} from "react-native";

import {
  useEffect,
  useState,
} from "react";

import { BACKEND_URL }
from "@/services/api";

export default function History() {

  const [transactions, setTransactions] =
    useState<any[]>([]);

  async function fetchHistory() {

    try {

      const response =
        await BACKEND_URL.get(
          "/api/wallet/history"
        );

      setTransactions(
        response.data.transactions
      );

    } catch (error) {

      console.log(error);
    }
  }

  useEffect(() => {
    fetchHistory();
  }, []);

  function renderItem({
  item,
}: any) {

  const isDebit =
    item.transactionType ===
    "DEBIT";

  return (
    <View
      style={{
        backgroundColor: "#18181B",
        padding: 18,
        borderRadius: 18,
        marginBottom: 14,

        flexDirection: "row",

        justifyContent:
          "space-between",

        alignItems: "center",
      }}
    >
      {/* Left */}
      <View>

        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          {isDebit
            ? `Sent to ${item.otherUser}`
            : `Received from ${item.otherUser}`}
        </Text>

        <Text
          style={{
            color: "#71717A",
            marginTop: 6,
            fontSize: 12,
          }}
        >
          {new Date(
            item.created_at
          ).toLocaleString()}
        </Text>

      </View>

      {/* Right */}
      <Text
        style={{
          color:
            isDebit
              ? "#EF4444"
              : "#10B981",

          fontSize: 18,

          fontWeight: "bold",
        }}
      >
        {isDebit ? "-" : "+"}
        ₹{item.amount}
      </Text>
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
      <Text
        style={{
          color: "white",
          fontSize: 30,
          fontWeight: "bold",
          marginTop: 50,
          marginBottom: 24,
        }}
      >
        History
      </Text>

      <FlatList
        data={transactions}

        keyExtractor={(item) => item.id}

        renderItem={renderItem}

        showsVerticalScrollIndicator={
          false
        }
      />
    </View>
  );
}