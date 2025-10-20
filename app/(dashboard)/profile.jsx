import { Text, StyleSheet, FlatList, Pressable, View } from "react-native";
import { useUser } from "../../hooks/useUser";
import ThemedButton from "../../components/ThemedButton";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import Spacer from "../../components/Spacer";
import { usePosts } from "../../hooks/usePosts";
import ThemedCard from "../../components/ThemedCard";
import { getHumanReadableDateFromTimeStamp } from "../../helpers/date";
import { useRouter } from "expo-router";

const Profile = () => {
  const router = useRouter();
  const { logout, user } = useUser();
  const { posts } = usePosts();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      setError(error.message);
    }
  };

  const sortedPosts = posts?.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

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
        data={sortedPosts?.filter((item) => item.author === user?.email)}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(`/posts/${item.id}`)}>
            <ThemedCard>
              <ThemedText>{item.title}</ThemedText>
              <Spacer height={20} />
              <View style={{ flexDirection: "row" }}>
                <ThemedText style={{ fontSize: 12 }}>
                  {getHumanReadableDateFromTimeStamp(item.createdAt)}
                </ThemedText>
                <ThemedText style={{ fontSize: 12, marginLeft: "auto" }}>
                  {item.author}
                </ThemedText>
              </View>
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
