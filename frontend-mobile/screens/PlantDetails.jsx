import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { lightTheme } from "../theme/colors";
import BigButton from "../components/BigButton";
import PlantDetailsCards from "../components/PlantDetailsCards";
import { format, parseISO } from "date-fns";
import { sv } from "date-fns/locale";

const PlantDetails = ({ route }) => {
  const navigation = useNavigation();
  const { otherParams } = route.params;

  const values = [
    { title: "Senast vattnad", value: otherParams.lastWatered },
    {
      title: "Fuktighet",
      value: otherParams.moisture
        ? `${otherParams.moisture}%`
        : "Ej tillgänglig",
    },
    { title: "Solljus", value: "80%" },
    { title: "Växtens temperatur", value: "18°C" },
    { title: "Jordens temperatur", value: "15°C" },
    { title: "Kvävenivå", value: "50 mg/kg" },
    { title: "Fosfornivå", value: "115 mg/kg" },
    { title: "Kaliumnivå", value: "123 mg/kg" },
  ];

  const statusBackground =
    otherParams.status === "Healthy"
      ? "#3F6133"
      : otherParams.status === "Unhealthy"
      ? "#FFDE8D"
      : otherParams.status === "Dying"
      ? "#FF0000"
      : "grey";

  const statusText =
    otherParams.status === "Healthy"
      ? "#FFFFFF"
      : otherParams.status === "Unhealthy"
      ? "#000000"
      : otherParams.status === "Dying"
      ? "#FFFFFF"
      : "grey";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.card}>
        <BigButton
          title="Gå tillbaka"
          variant="secondary"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.header}>
          <Text style={styles.title}>{otherParams.name}</Text>
          <Text
            style={[
              styles.status,
              { backgroundColor: statusBackground, color: statusText },
            ]}
          >
            {otherParams.status}
          </Text>
        </View>
        <View style={styles.valueSection}>
          {values.map((item, index) => (
            <PlantDetailsCards
              key={index}
              title={item.title}
              value={
                item.title === "Senast vattnad" && item.value
                  ? format(parseISO(item.value), "d MMM yyyy, HH:mm", {
                      locale: sv,
                    })
                  : item.value
              }
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PlantDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTheme.primary,
  },
  card: {
    borderRadius: 10,
    padding: 30,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  status: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 10,
    width: 100,
    borderRadius: 10,
    padding: 10,
    alignSelf: "center",
  },
  header: {
    backgroundColor: "#FFFFFF",
    marginVertical: 20,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  valueSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
