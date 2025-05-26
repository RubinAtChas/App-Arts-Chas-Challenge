import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const DashboardHeader = ({ url, user }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={url} style={styles.headerIcon} />
        <Text style={styles.headerText}>Hej, {user}</Text>
      </View>
    </View>
  );
};

export default DashboardHeader;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerIcon: {
    backgroundColor: "#FFFFFF",
    borderColor: "#FFFFFF",
    borderWidth: 10,
    borderRadius: "100%",
  },
});
