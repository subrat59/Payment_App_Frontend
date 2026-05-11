import { View, Text, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect } from "react";

export default function Scan() {
  const [permission, requestPermission] = useCameraPermissions();

  // Ask permission when screen opens
  useEffect(() => {
    console.log(permission);
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  // Permission loading
  if (!permission) {
    console.log(permission);
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Requesting Permission...</Text>
      </View>
    );
  }

  // Permission denied
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>
          Camera permission is required
        </Text>
      </View>
    );
  }

  // Camera UI
  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
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