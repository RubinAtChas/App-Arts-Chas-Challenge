import { StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { addUser } from "../services/api";
import BigButton from "../components/BigButton";
import { lightTheme } from "../theme/colors";

const CreateAccount = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    await addUser(name, password, email);
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView
      style={styles.container}
      accessible={true}
      accessibilityLabel="Skapa konto-skärm"
    >
      <View style={styles.form} accessible={true}>
        <Text
          style={styles.title}
          accessibilityRole="header"
          accessibilityLabel="Skapa en ny användare"
        >
          Skapa en ny användare
        </Text>
        <TextInput
          placeholder="Namn"
          style={styles.input}
          value={name}
          onChangeText={setName}
          returnKeyType="next"
          textContentType="name"
          accessibilityLabel="Ange ditt namn"
        />
        <TextInput
          placeholder="E-post"
          keyboardType="email-address"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          returnKeyType="next"
          textContentType="emailAddress"
          accessibilityLabel="Ange din e-postadress"
        />
        <TextInput
          placeholder="Lösenord"
          secureTextEntry={true}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          returnKeyType="done"
          textContentType="password"
          accessibilityLabel="Ange ett lösenord"
        />
        <BigButton
          title="Skapa ett konto"
          variant="accent"
          onPress={handleSubmit}
          styles={styles.createBtn}
          accessibilityLabel="Skapa konto-knapp"
          accessibilityRole="button"
        />
        <BigButton
          title="Avbryt"
          variant="secondary"
          onPress={() => navigation.goBack()}
          style={styles.button}
          accessibilityLabel="Avbryt och gå tillbaka"
          accessibilityRole="button"
        />
      </View>
    </SafeAreaView>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTheme.primary,
  },
  form: {
    borderRadius: 10,
    padding: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});
