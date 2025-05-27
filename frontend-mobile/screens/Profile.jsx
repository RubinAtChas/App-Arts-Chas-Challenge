import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import { lightTheme } from "../theme/colors";
import { useUser } from "../context/UserContext";
import BigButton from "../components/BigButton";
import DashboardHeader from "../components/DashboardHeader";

const Profile = () => {
  const { username, clearUser } = useUser();

  const handlePress = () => {
    clearUser();
  };

  return (
    <SafeAreaView
      style={styles.container}
      accessible={true}
      accessibilityLabel="Profilskärm"
    >
      <View accessible={true} accessibilityLabel={`Inloggad som ${username}`}>
        <DashboardHeader
          url={require("../assets/icon-farmer-2.png")}
          user={username}
        />
      </View>
      <BigButton
        title="Logga ut"
        onPress={handlePress}
        variant="primary"
        style={styles.button}
        accessibilityLabel="Logga ut från ditt konto"
        accessibilityRole="button"
      />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTheme.primary,
  },
  button: {
    width: 300,
    marginTop: 50,
    marginHorizontal: "auto",
  },
});
