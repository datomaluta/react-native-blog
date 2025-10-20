import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { usePosts } from "../../../hooks/usePosts";
import ThemedView from "../../../components/ThemedView";
import ThemedText from "../../../components/ThemedText";
import { StyleSheet, Text, View } from "react-native";
import ThemedCard from "../../../components/ThemedCard";
import { getHumanReadableDateFromTimeStamp } from "../../../helpers/date";
import ThemedButton from "../../../components/ThemedButton";
import { useUser } from "../../../hooks/useUser";

const PostDetails = () => {
  const [post, setPost] = useState(null);

  const { id } = useLocalSearchParams();

  const { getPostById, deletePost } = usePosts();
  const { user } = useUser();

  const router = useRouter();

  const handleDelete = async () => {
    await deletePost(id);
    setPost(null);
    router.replace("/posts");
  };

  useEffect(() => {
    async function getPost() {
      const post = await getPostById(id);
      setPost(post);
    }

    getPost();

    return () => setPost(null);
  }, [id]);

  return (
    <ThemedView safe={true} style={styles.container}>
      <ThemedButton onPress={() => router.push("/posts")}>
        <Text style={{ textAlign: "center", color: "white" }}>Back</Text>
      </ThemedButton>
      <ThemedCard style={{ marginTop: 20 }}>
        <ThemedText style={styles.title}>{post?.title}</ThemedText>
        <ThemedText>{post?.body}</ThemedText>

        <ThemedText style={{ fontSize: 12, marginTop: 30, marginBottom: 5 }}>
          {post?.author}
        </ThemedText>
        <ThemedText style={{ fontSize: 12 }}>
          {getHumanReadableDateFromTimeStamp(post?.createdAt)}
        </ThemedText>

        {post?.author === user.email && (
          <ThemedButton
            style={{
              width: 120,
              backgroundColor: "red",
              marginTop: 40,
              marginLeft: "auto",
            }}
            onPress={handleDelete}
          >
            <Text style={{ textAlign: "center", color: "white" }}>Delete</Text>
          </ThemedButton>
        )}
      </ThemedCard>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 500,
    marginBottom: 20,
    textAlign: "center",
  },
  body: {},
});

export default PostDetails;
