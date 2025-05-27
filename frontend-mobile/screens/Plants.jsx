import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Platform,
} from "react-native";
import { useEffect, useState } from "react";
import { lightTheme } from "../theme/colors";
import PlantFilter from "../components/PlantFilter";
import CategoryCard from "../components/CategoryCard";
import { fetchPlants } from "../services/api";
import { useUser } from "../context/UserContext";

const Plants = () => {
  const [userPlants, setUserPlants] = useState([]);
  const { username, userId } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      const data = await fetchPlants(userId);
      if (data) setUserPlants(data);
    };
    fetchData();
  }, [userId, userPlants]);

  return (
    <SafeAreaView
      style={styles.container}
      accessible={true}
      accessibilityLabel="Växtöversiktsskärm"
    >
      <ScrollView
        contentContainerStyle={styles.content}
        accessible={true}
        accessibilityLabel="Lista över växthus och växter"
      >
        <View style={styles.PlantFilter}>
          <PlantFilter />
        </View>
        <View>
          <CategoryCard
            title="Växthus 1"
            plants={userPlants.map((item) => ({
              id: item.flower_id,
              name: item.flower_name,
              lastWatered: item.last_watered,
              wateringInterval: item.watering_interval,
              moisture: item.moisture,
              light: item.light,
              temp: item.temp,
              nitrogen: item.nitrogen_level,
              phosphor: item.phosphor,
              potassium: item.potassium,
              status: "Healthy",
            }))}
          />
          <CategoryCard
            title="Växthus 2"
            plants={[
              { name: "Tomat 1", status: "Healthy", type: "tomato" },
              { name: "Tomat 2", status: "Unhealthy", type: "tomato" },
              { name: "Tomat 3", status: "Healthy", type: "tomato" },
            ]}
            style={styles.CategoryCard}
          />
          <CategoryCard
            title="Växthus 3"
            plants={[
              { name: "Citron 1", status: "Dying", type: "lemon" },
              { name: "Citron 2", status: "Healthy", type: "lemon" },
            ]}
            style={styles.CategoryCard}
          />
          <CategoryCard
            title="Växthus 4"
            plants={[
              { name: "Citron 1", status: "Dying", type: "lemon" },
              { name: "Citron 2", status: "Healthy", type: "lemon" },
            ]}
            style={styles.CategoryCard}
          />
          <CategoryCard
            title="Växthus 5"
            plants={[
              { name: "Tomat 1", status: "Healthy", type: "tomato" },
              { name: "Tomat 2", status: "Unhealthy", type: "tomato" },
              { name: "Tomat 3", status: "Healthy", type: "tomato" },
            ]}
            style={styles.CategoryCard}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Plants;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTheme.primary,
    marginBottom: Platform.OS === "ios" ? 80 : 45,
  },
  content: {},
  PlantFilter: {
    flex: 1,
    marginBottom: 50,
    borderRadius: 10,
  },
  CategoryCard: {
    flex: 1,
    paddingBottom: 50,
    borderRadius: 10,
  },
});
