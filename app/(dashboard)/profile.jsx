import { View, Text } from "react-native";
import { useUser } from "../../hooks/useUser";
import ThemedButton from "../../components/ThemedButton";

const Profile = () => {
  const { logout } = useUser();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <View style={{ backgroundColor: "red" }}>
      <Text>Profile Page</Text>
      <ThemedButton onPress={handleLogout}>
        <Text>Logout</Text>
      </ThemedButton>
    </View>
  );
};

export default Profile;
