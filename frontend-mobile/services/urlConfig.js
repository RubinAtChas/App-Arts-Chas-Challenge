import { Platform } from "react-native";

let baseUrl = "";

if (Platform.OS === "android") {
  baseUrl = "http://10.0.2.2:3000";
} else if (Platform.OS === "web") {
  baseUrl = "http://localhost:3000";
} else {
  baseUrl = "http://192.168.68.108:3000"; //Byt ut mot egen IP-adress
}

export default baseUrl;
