import axios from "axios";

import AsyncStorage from
"@react-native-async-storage/async-storage";

export const BACKEND_URL = axios.create({
  baseURL:
    process.env.EXPO_PUBLIC_API_URL,
});

console.log("He")
BACKEND_URL.interceptors.request.use(
  async (config) => {

    // Get token from storage
    const token =
      await AsyncStorage.getItem("token");

    // If token exists
    console.log(token)
    if (token) {

      // Add token in request headers
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  }
);