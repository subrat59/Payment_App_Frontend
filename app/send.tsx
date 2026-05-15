import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";

import {
  useState,
  useEffect,
} from "react";

import {
  useLocalSearchParams,
} from "expo-router";

import { BACKEND_URL }
from "@/services/api";



export default function SendMoney() {

  /*
  ===================================
  QR PARAM
  ===================================
  */

  const { receiverId } =
    useLocalSearchParams();



  /*
  ===================================
  STATES
  ===================================
  */

  const [
    receiverPhone,
    setReceiverPhone,
  ] = useState("");

  const [amount, setAmount] =
    useState("");

  const [receiver, setReceiver] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);



  /*
  ===================================
  FETCH RECEIVER FROM QR
  ===================================
  */

  async function fetchReceiver() {

    try {

      setLoading(true);

      const response =
        await BACKEND_URL.get(
          `/api/users/${receiverId}`
        );

      setReceiver(
        response.data.user
      );

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Error",
        "Failed to fetch receiver"
      );

    } finally {

      setLoading(false);
    }
  }



  /*
  ===================================
  QR FLOW
  ===================================
  */

  useEffect(() => {

    if (receiverId) {
      fetchReceiver();
    }

  }, [receiverId]);



  /*
  ===================================
  MASK PHONE
  ===================================
  */

  const maskedPhone =
    receiver?.phone
      ? "xxxxxx" +
        receiver.phone.slice(-4)
      : "";



  /*
  ===================================
  SEND MONEY
  ===================================
  */

  async function handleTransfer() {

    try {

      const payload: any = {
        amount: Number(amount),
      };

      // QR flow
      if (receiverId) {

        payload.receiverId =
          receiverId;
      }

      // Phone flow
      else {

        payload.receiverPhone =
          receiverPhone;
      }

      const response =
        await BACKEND_URL.post(
          "/api/wallet/transfer",
          payload
        );

      Alert.alert(
        "Success",
        response.data.message
      );

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Failed",
        "Transfer failed"
      );
    }
  }



  /*
  ===================================
  LOADING
  ===================================
  */

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



  /*
  ===================================
  UI
  ===================================
  */

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0A0A0A",
        padding: 24,
        justifyContent: "center",
      }}
    >

      {/* Heading */}
      <Text
        style={{
          color: "white",
          fontSize: 32,
          fontWeight: "bold",
          marginBottom: 30,
        }}
      >
        Send Money
      </Text>



      {/* PHONE FLOW */}
      {!receiverId && (

        <TextInput
          placeholder="Receiver Phone Number"

          placeholderTextColor="#71717A"

          value={receiverPhone}

          onChangeText={
            setReceiverPhone
          }

          style={{
            backgroundColor: "#18181B",

            color: "white",

            padding: 18,

            borderRadius: 16,

            marginBottom: 20,
          }}
        />
      )}



      {/* QR FLOW */}
      {receiver && (

        <View
          style={{
            backgroundColor: "#18181B",

            padding: 20,

            borderRadius: 20,

            marginBottom: 20,
          }}
        >

          <Text
            style={{
              color: "#71717A",

              fontSize: 14,
            }}
          >
            Paying To
          </Text>

          <Text
            style={{
              color: "white",

              fontSize: 24,

              fontWeight: "bold",

              marginTop: 8,
            }}
          >
            {receiver.full_name}
          </Text>

          <Text
            style={{
              color: "#A1A1AA",

              marginTop: 6,

              fontSize: 16,
            }}
          >
            {maskedPhone}
          </Text>

        </View>
      )}



      {/* Amount */}
      <TextInput
        placeholder="Enter Amount"

        placeholderTextColor="#71717A"

        keyboardType="numeric"

        value={amount}

        onChangeText={setAmount}

        style={{
          backgroundColor: "#18181B",

          color: "white",

          padding: 18,

          borderRadius: 16,

          marginBottom: 30,
        }}
      />



      {/* Button */}
      <Pressable
        onPress={handleTransfer}

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

            fontWeight: "bold",

            fontSize: 16,
          }}
        >
          Send Money
        </Text>
      </Pressable>

    </View>
  );
}