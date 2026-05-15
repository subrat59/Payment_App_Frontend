import {
  View,
  Text,
  StyleSheet,
  Alert,
} from "react-native";

import {
  CameraView,
  useCameraPermissions,
} from "expo-camera";

import {
  useEffect,
  useState,
} from "react";

import { router }
from "expo-router";



export default function Scan() {

  const [
    permission,
    requestPermission,
  ] = useCameraPermissions();

  // Prevent multiple scans
  const [scanned, setScanned] =
    useState(false);



  /*
  ====================================
  ASK CAMERA PERMISSION
  ====================================
  */

  useEffect(() => {

    if (!permission?.granted) {
      requestPermission();
    }

  }, []);



  /*
  ====================================
  HANDLE QR SCAN
  ====================================
  */

  function handleBarcodeScanned({
    data,
  }: any) {

    // Prevent multiple scans
    if (scanned) return;

    setScanned(true);

    console.log(
      "QR Data:",
      data
    );

    try {

      // Example:
      // payflow://pay?userId=123

      const url = new URL(data);

      const receiverId =
        url.searchParams.get(
          "userId"
        );

      if (!receiverId) {

        Alert.alert(
          "Invalid QR",
          "Receiver not found"
        );

        return;
      }

      // Navigate to send screen
      router.push({
        pathname: "/send",

        params: {
          receiverId,
        },
      });

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Invalid QR Code",
        "Please scan valid PayFlow QR"
      );

      setScanned(false);
    }
  }



  /*
  ====================================
  PERMISSION LOADING
  ====================================
  */

  if (!permission) {

    return (
      <View style={styles.center}>
        <Text style={styles.text}>
          Requesting Permission...
        </Text>
      </View>
    );
  }



  /*
  ====================================
  PERMISSION DENIED
  ====================================
  */

  if (!permission.granted) {

    return (
      <View style={styles.center}>
        <Text style={styles.text}>
          Camera permission is required
        </Text>
      </View>
    );
  }



  /*
  ====================================
  CAMERA UI
  ====================================
  */

  return (
    <View style={{ flex: 1 }}>

      <CameraView
        style={
          StyleSheet.absoluteFillObject
        }

        facing="back"

        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}

        onBarcodeScanned={
          handleBarcodeScanned
        }
      />



      {/* Overlay */}
      <View style={styles.overlay}>

        <View style={styles.scanBox} />

        <Text style={styles.scanText}>
          Scan QR Code
        </Text>

      </View>

    </View>
  );
}



const styles = StyleSheet.create({

  center: {
    flex: 1,

    backgroundColor: "#0A0A0A",

    justifyContent: "center",

    alignItems: "center",
  },

  text: {
    color: "white",

    fontSize: 18,
  },

  overlay: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",
  },

  scanBox: {
    width: 260,

    height: 260,

    borderWidth: 3,

    borderColor: "#10B981",

    borderRadius: 24,
  },

  scanText: {
    color: "white",

    fontSize: 20,

    marginTop: 30,

    fontWeight: "600",
  },
});