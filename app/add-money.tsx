import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
} from "react-native";

import { useState } from "react";

import RazorpayCheckout from "react-native-razorpay";

import { BACKEND_URL } from "@/services/api";
import { router } from "expo-router";

export default function AddMoney() {

  const [amount, setAmount] = useState("");

  async function handlePayment() {

    try {

      // Validate amount
      if (!amount || Number(amount) <= 0) {

        Alert.alert(
          "Invalid Amount",
          "Please enter valid amount"
        );

        return;
      }

      // Create order from backend
      const response =
        await BACKEND_URL.post(
          "/api/payments/create-order",
          {
            amount: Number(amount),
          }
        );

      const order = response.data.order;

      // Razorpay options
      const options = {

        description: "Wallet Topup",

        currency: "INR",

        key:
          process.env
            .EXPO_PUBLIC_RAZORPAY_KEY,

        amount: order.amount,

        order_id: order.id,

        name: "PayFlow",

        prefill: {

          email: "test@test.com",

          contact: "9999999999",

          name: "Subrat",
        },

        theme: {
          color: "#10B981",
        },
      };

      console.log(
        "Opening Razorpay..."
      );

      // Open Razorpay payment sheet
      const payment =
        await RazorpayCheckout.open(
          options
        );

      console.log(payment);

      // Optional:
      // Call verify-payment API here

      const verifyResponse =
  await BACKEND_URL.post(
    "/api/payments/verify-payment",
    {
      razorpay_order_id:
        payment.razorpay_order_id,

      razorpay_payment_id:
        payment.razorpay_payment_id,

      razorpay_signature:
        payment.razorpay_signature,
    }
  );

    console.log(
      "Verify Response:",
      verifyResponse.data
    );

    Alert.alert(
        "Payment Success",
        `Payment ID: ${payment.razorpay_payment_id}`,
        [
       {
        text: "OK",
        
        onPress: () =>
          router.replace("/tabs/home"),
         },
        ]
      );

    } catch (error: any) {

      console.log(error);

      Alert.alert(
        "Payment Failed",
        error?.description ||
        "Something went wrong"
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
          fontSize: 30,
          fontWeight: "bold",
          marginBottom: 30,
        }}
      >
        Add Money
      </Text>

      <TextInput
        placeholder="Enter Amount"

        placeholderTextColor="#71717A"

        keyboardType="numeric"

        value={amount}

        onChangeText={setAmount}

        style={{
          backgroundColor: "#18181B",

          color: "white",

          padding: 20,

          borderRadius: 18,

          fontSize: 18,

          marginBottom: 24,
        }}
      />

      <Pressable
        onPress={handlePayment}

        style={{
          backgroundColor: "#10B981",

          padding: 18,

          borderRadius: 18,

          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",

            fontWeight: "bold",

            fontSize: 18,
          }}
        >
          Add Money
        </Text>
      </Pressable>

    </View>
  );
}