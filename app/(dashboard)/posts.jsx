import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import ThemedView from "../../components/ThemedView";
import { usePosts } from "../../hooks/usePosts";
import ThemedText from "../../components/ThemedText";
import ThemedCard from "../../components/ThemedCard";
import Spacer from "../../components/Spacer";
import { getHumanReadableDateFromTimeStamp } from "../../helpers/date";
import { useRouter } from "expo-router";

const Posts = () => {
  const router = useRouter();
  const { posts } = usePosts();
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <ThemedView safe={true} style={styles.container}>
      <ThemedText style={styles.title}>Posts Page</ThemedText>
      <FlatList
        style={{ marginTop: 20 }}
        contentContainerStyle={styles.list}
        data={sortedPosts}
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
  title: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },

  list: {
    gap: 20,
  },
});

export default Posts;
