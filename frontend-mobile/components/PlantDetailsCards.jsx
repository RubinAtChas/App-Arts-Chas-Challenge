import { StyleSheet, Text, View } from "react-native";
import React from "react";

const PlantDetailsCards = ({ title, value }) => {
  const displayValue = value ?? "Ej tillgänglig";

  return (
    <View
      style={styles.card}
      accessible={true}
      accessibilityRole="summary"
      accessibilityLabel={`${title}: ${displayValue}`}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{displayValue}</Text>
    </View>
  );
};

export default PlantDetailsCards;

const styles = StyleSheet.create({
  card: {
    width: "48%",
    height: 200,
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
  },
});
