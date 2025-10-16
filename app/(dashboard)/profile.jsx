import { Text, StyleSheet, FlatList, Pressable } from "react-native";
import { useUser } from "../../hooks/useUser";
import ThemedButton from "../../components/ThemedButton";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import Spacer from "../../components/Spacer";
import { usePosts } from "../../hooks/usePosts";
import ThemedCard from "../../components/ThemedCard";

const Profile = () => {
  const { logout, user } = useUser();
  const { posts } = usePosts();

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
      <Spacer />
      <ThemedButton onPress={handleLogout} style={{ marginTop: "auto" }}>
        <Text style={{ color: "white", textAlign: "center" }}>Logout</Text>
      </ThemedButton>
      <Spacer />

      <ThemedText style={{ marginTop: 20, fontSize: 20, fontWeight: "bold" }}>
        My Posts
      </ThemedText>

      <FlatList
        style={{ marginTop: 20 }}
        contentContainerStyle={styles.list}
        data={posts?.filter((item) => item.author === user?.email)}
        renderItem={({ item }) => (
          <Pressable onPress={() => console.log(item)}>
            <ThemedCard>
              <ThemedText>{item.title}</ThemedText>
              <Spacer height={10} />
              <ThemedText style={{ fontSize: 12, marginLeft: "auto" }}>
                Written by {item.author}
              </ThemedText>
            </ThemedCard>
          </Pressable>
        )}
        keyExtractor={(item) => String(item.id)}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  list: {
    gap: 20,
  },
});

export default Profile;
