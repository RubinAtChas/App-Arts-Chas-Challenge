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
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Skapa en ny användare</Text>
        <TextInput
          placeholder="Namn"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
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
          title="Skapa ett konto"
          variant="accent"
          onPress={handleSubmit}
          styles={styles.createBtn}
        />
        <BigButton
          title="Avbryt"
          variant="secondary"
          onPress={() => navigation.goBack()}
          style={styles.button}
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
    padding: 30,
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
