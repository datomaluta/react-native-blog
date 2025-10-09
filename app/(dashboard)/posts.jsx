import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import ThemedView from "../../components/ThemedView";
import { usePosts } from "../../hooks/usePosts";
import ThemedText from "../../components/ThemedText";
import ThemedCard from "../../components/ThemedCard";
import Spacer from "../../components/Spacer";

const Posts = () => {
  const { posts } = usePosts();
  console.log("posts", posts);
  return (
    <ThemedView safe={true} style={styles.container}>
      <ThemedText style={styles.title}>Posts Page</ThemedText>
      <FlatList
        style={{ marginTop: 20 }}
        contentContainerStyle={styles.list}
        data={posts}
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
