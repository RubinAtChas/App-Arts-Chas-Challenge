import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { lightTheme } from "../theme/colors";

const SensorStatus = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.flexContainer}>
          <Text style={styles.status}>Alla sensorer är i drift</Text>
          <Image
            source={require("../assets/icons8-sensor-48.png")}
            style={styles.image}
          />
        </View>
      </View>
    </View>
  );
};

export default SensorStatus;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#FFFFFF",
    paddingBottom: 25,
  },
  container: {
    backgroundColor: lightTheme.neutral,
    padding: 30,
    borderBottomLeftRadius: 10,
    borderBottomEndRadius: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  flexContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
  },
  image: {
    height: 40,
    width: 40,
    resizeMode: "contain",
  },
  status: {
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center",
  },
});
