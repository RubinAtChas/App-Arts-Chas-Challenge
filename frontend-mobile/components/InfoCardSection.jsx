import { StyleSheet, FlatList, View } from "react-native";
import { useEffect, useState } from "react";
import { fetchPlants } from "../services/api";
import { useUser } from "../context/UserContext";
import InfoCard from "./InfoCard";
import { getMedianMoisture } from "../services/calc";

const InfoCardSection = () => {
  const [userPlants, setUserPlants] = useState([]);
  const [medianMoisture, setMedianMoisture] = useState(
    getMedianMoisture(userPlants)
  );
  const { userId } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      const data = await fetchPlants(userId);
      if (data) setUserPlants(data);
    };
    fetchData();
  }, [userId, userPlants]);

  useEffect(() => {
    const newMedianMoisture = getMedianMoisture(userPlants);
    setMedianMoisture(newMedianMoisture);
  }, [userPlants]);

  const plantInfo = [
    {
      id: 1,
      title: "Växthus 1",
      info: medianMoisture,
      image: require("../assets/icons8-water-96.png"),
    },
    {
      id: 2,
      title: "Växthus 1",
      info: "Växterna får tillräckligt med solljus för att frodas, inga åtgärder krävs. ",
      image: require("../assets/icons8-sun-96.png"),
    },
    {
      id: 3,
      title: "Växthus 2",
      info: "Jordfuktigheten är okej, den ligger på 51% kolla till växthuset om någon dag.",
      image: require("../assets/icons8-water-96.png"),
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={plantInfo}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.scrollContent}
        showsHorizontalScrollIndicator={false}
        accessibilityRole="scrollbar"
        accessibilityLabel="Informationskort om växthus"
        renderItem={({ item }) => (
          <InfoCard
            title={item.title}
            info={item.info}
            image={item.image}
            accessible={true}
            accessibilityLabel={`${item.title}. ${item.info}`}
            accessibilityRole="summary"
          />
        )}
      />
    </View>
  );
};

export default InfoCardSection;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  scrollContent: {
    padding: 30,
    alignContent: "center",
  },
});
