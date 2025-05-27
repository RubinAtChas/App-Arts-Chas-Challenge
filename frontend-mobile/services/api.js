import { jwtDecode } from "jwt-decode";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import baseUrl from "./urlConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchUsers = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/get-users`);
    if (!response.ok) throw new Error("Fel vid hämtning av användare.");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const apiLogin = async (email, password) => {
  try {
    const response = await fetch(`${baseUrl}/api/user-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Received token:", data.token);
      Platform.OS === "web"
        ? await AsyncStorage.setItem("token", data.token)
        : await SecureStore.setItemAsync("token", data.token);
      const decoded = jwtDecode(data.token);
      return { success: true, name: decoded.name, userId: decoded.userId };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchPlants = async (id) => {
  try {
    const token =
      Platform.OS === "web"
        ? await AsyncStorage.getItem("token")
        : await SecureStore.getItemAsync("token");
    const response = await fetch(`${baseUrl}/api/${id}/get-flowers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Fel vid hämtning av data.");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const addPlant = async (name, id) => {
  try {
    const token =
      Platform.OS === "web"
        ? await AsyncStorage.getItem("token")
        : await SecureStore.getItemAsync("token");
    const response = await fetch(`${baseUrl}/api/${id}/add-flower`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({ flower_name: name }),
    });
    if (!response.ok) throw new Error("Fel vid hämtning av data.");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const addUser = async (name, password, email) => {
  try {
    const response = await fetch(`${baseUrl}/api/create-user`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name: name, password: password, email: email }),
    });
    if (!response.ok) throw new Error("Fel vid hämtning av data.");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const removePlant = async (userId, plantId) => {
  try {
    const token =
      Platform.OS === "web"
        ? await AsyncStorage.getItem("token")
        : await SecureStore.getItemAsync("token");
    const response = await fetch(
      `${baseUrl}/api/${userId}/remove-flower/${plantId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      }
    );
    if (!response.ok) throw new Error("Fel vid borttagning av växt.");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updatePlant = async (name, userId, plantId) => {
  try {
    const token =
      Platform.OS === "web"
        ? await AsyncStorage.getItem("token")
        : await SecureStore.getItemAsync("token");
    const response = await fetch(
      `${baseUrl}/api/${userId}/update-flower/${plantId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({ flower_name: name }),
      }
    );
    if (!response.ok) throw new Error("Fel vid hämtning av data.");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
