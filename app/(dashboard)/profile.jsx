import { Text, StyleSheet } from "react-native";
import { useUser } from "../../hooks/useUser";
import ThemedButton from "../../components/ThemedButton";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import Spacer from "../../components/Spacer";

const Profile = () => {
  const { logout, user } = useUser();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <ThemedView safe={true} style={styles.container}>
      <Spacer />
      <ThemedText style={{ fontSize: 20, fontWeight: "bold" }}>
        Current User: {user?.email}
      </ThemedText>
      <ThemedButton onPress={handleLogout} style={{ marginTop: "auto" }}>
        <Text style={{ color: "white", textAlign: "center" }}>Logout</Text>
      </ThemedButton>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Profile;
