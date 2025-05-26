import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const InfoCard = ({ title, info, image }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>
        <Image source={image} style={styles.icon} />
        <Text style={styles.info}>{info}</Text>
      </View>
    </View>
  );
};

export default InfoCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 40,
    width: 310,
    height: 310,
    margin: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 25,
  },
  content: {
    flexDirection: "row",
  },
  info: {
    fontSize: 18,
    marginLeft: 15,
    width: 150,
    alignSelf: "flex-start",
    paddingTop: 5,
  },
  icon: {
    width: 60,
    height: 60,
  },
});
