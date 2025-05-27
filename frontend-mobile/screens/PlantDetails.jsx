import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { lightTheme } from "../theme/colors";
import BigButton from "../components/BigButton";
import PlantDetailsCards from "../components/PlantDetailsCards";
import { format, parseISO } from "date-fns";
import { sv } from "date-fns/locale";
import { useUser } from "../context/UserContext";
import { removePlant } from "../services/api";

const PlantDetails = ({ route }) => {
  const navigation = useNavigation();
  const { otherParams } = route.params;
  const { userId } = useUser();
  const plantId = otherParams.id;

  const deletePlant = async () => {
    await removePlant(userId, plantId);
    navigation.goBack();
  };

  const updatePlant = () => {
    console.log("Uppdatera");
  };

  const values = [
    { title: "Senast vattnad", value: otherParams.lastWatered },
    {
      title: "Fuktighet",
      value: otherParams.moisture
        ? `${otherParams.moisture}%`
        : "Ej tillgänglig",
    },
    {
      title: "Solljus",
      value: otherParams.light ? `${otherParams.light}%` : "Ej tillgänglig",
    },
    {
      title: "Temperatur",
      value: otherParams.temp ? `${otherParams.temp}°C` : "Ej tillgänglig",
    },
    {
      title: "Kvävenivå",
      value: otherParams.nitrogen
        ? `${otherParams.nitrogen} mg/kg`
        : "Ej tillgänglig",
    },
    {
      title: "Fosfornivå",
      value: otherParams.phosphor
        ? `${otherParams.phosphor} mg/kg`
        : "Ej tillgänglig",
    },
    {
      title: "Kaliumnivå",
      value: otherParams.potassium
        ? `${otherParams.potassium} mg/kg`
        : "Ej tillgänglig",
    },
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
    <SafeAreaView
      style={styles.container}
      accessible={true}
      accessibilityLabel={`Detaljer för växten ${otherParams.name}`}
    >
      <ScrollView
        style={styles.card}
        accessible={true}
        accessibilityLabel="Information om växtens status, miljö och näringsämnen"
      >
        <BigButton
          title="Gå tillbaka"
          variant="primary"
          onPress={() => navigation.goBack()}
          accessibilityLabel="Gå tillbaka till föregående sida"
        />
        <View
          style={styles.header}
          accessible={true}
          accessibilityLabel={`Växtnamn: ${otherParams.name}. Status: ${otherParams.status}`}
        >
          <Text style={styles.title}>{otherParams.name}</Text>
          <Text
            style={[
              styles.status,
              { backgroundColor: statusBackground, color: statusText },
            ]}
            accessibilityRole="text"
            accessibilityLabel={`Status: ${otherParams.status}`}
          >
            {otherParams.status}
          </Text>
        </View>
        <BigButton
          title="Byt namn"
          variant="accent"
          onPress={updatePlant}
          accessibilityLabel="Byt namn på växten"
        />
        <BigButton
          title="Ta bort"
          variant="secondary"
          onPress={deletePlant}
          style={styles.deleteButton}
          accessibilityLabel="Ta bort växten från listan"
        />
        <View
          style={styles.valueSection}
          accessible={true}
          accessibilityLabel="Mätvärden för växtens miljö och tillstånd"
        >
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
              accessibilityLabel={`${item.title}: ${item.value}`}
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
    marginTop: 15,
    width: 100,
    borderRadius: 10,
    padding: 10,
    alignSelf: "center",
  },
  header: {
    backgroundColor: "#FFFFFF",
    marginVertical: 20,
    padding: 30,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  deleteButton: {
    marginBottom: 20,
    marginTop: 10,
  },
  valueSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
