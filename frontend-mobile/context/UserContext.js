import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  const loadUserFromToken = async () => {
    const token =
      Platform.OS === "web"
        ? await AsyncStorage.getItem("token")
        : await SecureStore.getItemAsync("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUsername(decoded.name);
      setUserId(decoded.userId);
    }
  };

  useEffect(() => {
    loadUserFromToken();
  }, []);

  const clearUser = async () => {
    setUsername("");
    setUserId("");
    if (Platform.OS === "web") {
      await AsyncStorage.removeItem("token");
    } else {
      await SecureStore.deleteItemAsync("token");
    }
  };

  return (
    <UserContext.Provider
      value={{ username, userId, clearUser, loadUserFromToken }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
