import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { lightTheme } from "../theme/colors";
import BigButton from "../components/BigButton";
import { useUser } from "../context/UserContext";
import { apiLogin } from "../services/api";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const navigation = useNavigation();
  const { loadUserFromToken } = useUser();

  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("123");

  const handleNewAccount = () => {
    navigation.navigate("CreateAccount");
  };

  const handleSubmit = async () => {
    try {
      const response = await apiLogin(email, password);
      if (response && response.success) {
        loadUserFromToken();
      } else {
        console.log("Fel inloggningsuppgifter, försök igen.");
      }
    } catch (error) {
      console.error("Inloggningen misslyckades: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../assets/icon-plant.png")} style={styles.icon} />
      <View>
        <TextInput
          placeholder="E-post"
          keyboardType="email-address"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Lösenord"
          secureTextEntry={true}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        <BigButton
          title="Logga in"
          variant="accent"
          onPress={handleSubmit}
          styles={styles.logInBtn}
        />
      </View>
      <View style={styles.createContainer}>
        <Text style={styles.createText}>Har du inget konto?</Text>
        <BigButton
          title="Skapa ett konto"
          variant="secondary"
          onPress={handleNewAccount}
          styles={styles.createBtn}
        />
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: lightTheme.primary,
  },
  input: {
    backgroundColor: lightTheme.secondary,
    borderRadius: 10,
    width: 300,
    padding: 15,
    marginBottom: 10,
  },
  logInBtn: {},
  createBtn: {},
  createContainer: {
    marginTop: 100,
    width: 300,
  },
  createText: {
    color: lightTheme.textPrimary,
    paddingBottom: 10,
    textAlign: "center",
    fontSize: 16,
    fontWeight: 500,
  },
  icon: {
    marginBottom: 100,
  },
});
