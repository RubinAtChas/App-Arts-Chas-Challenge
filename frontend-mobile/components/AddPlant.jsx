import { StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { lightTheme } from "../theme/colors";
import { addPlant } from "../services/api";
import BigButton from "../components/BigButton";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../context/UserContext";

const AddPlant = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const { userId } = useUser();

  const handleSubmit = async () => {
    await addPlant(name, userId);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Lägg till ny växt</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Växtens namn"
        ></TextInput>
        <View>
          <BigButton
            title="Lägg till"
            variant="accent"
            onPress={handleSubmit}
          />
          <BigButton
            title="Avbryt"
            variant="secondary"
            onPress={() => navigation.goBack()}
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddPlant;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTheme.primary,
    padding: 50,
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
