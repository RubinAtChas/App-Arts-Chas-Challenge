import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import DashboardHeader from "../components/DashboardHeader";
import InfoCardSection from "../components/InfoCardSection";
import SensorStatus from "../components/SensorStatus";
import { lightTheme } from "../theme/colors";
import { useUser } from "../context/UserContext";
import Timelines from "../components/Timelines";

const Dashboard = () => {
  const { username } = useUser();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <DashboardHeader
              url={require("../assets/icon-farmer-2.png")}
              user={username}
            />
            <InfoCardSection />
            <SensorStatus />
            <Timelines />
          </>
        }
        data={[]} 
        renderItem={null}
        keyExtractor={() => "dummy"} 
      />
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightTheme.primary,
    flex: 1,
  },
});