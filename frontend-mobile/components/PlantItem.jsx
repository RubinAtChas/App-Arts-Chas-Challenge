import { Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import PlantStatusIcon from "./PlantStatusIcon";
import { lightTheme } from "../theme/colors";
import { useNavigation } from "@react-navigation/native";

export default function PlantItem({
  id,
  name,
  status,
  type,
  lastWatered,
  moisture,
  light,
  temp,
  nitrogen,
  phosphor,
  potassium,
}) {
  const navigation = useNavigation();

  const getIconSource = (type) => {
    switch (type) {
      case "tomato":
        return require("../assets/icons8-tomato-48.png");
      case "lemon":
        return require("../assets/icons8-citrus-48.png");
      default:
        return require("../assets/icon-plant.png");
    }
  };

  const handlePress = () => {
    navigation.navigate("Details", {
      otherParams: {
        id: id,
        name: name,
        status: status,
        type: type,
        lastWatered: lastWatered,
        moisture: moisture,
        light: light,
        temp: temp,
        nitrogen: nitrogen,
        phosphor: phosphor,
        potassium: potassium,
      },
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image source={getIconSource(type)} style={styles.icon} />
      <Text style={styles.text}>{name}</Text>
      <PlantStatusIcon status={status} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: lightTheme.primary,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginTop: 6,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  text: {
    flex: 1,
    marginLeft: 10,
  },
});
