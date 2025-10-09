import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { createContext, useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";

export const PostsContext = createContext();

export function PostsProvider({ children }) {
  const { user } = useUser();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  async function getPosts() {
    try {
      const posts = JSON.parse(await AsyncStorage.getItem("posts")) || [];
      setPosts(posts);
    } catch (error) {
      throw Error(error.message);
    }
  }

  async function createPost(title, body) {
    try {
      const posts = JSON.parse(await AsyncStorage.getItem("posts")) || [];
      const newPost = {
        id: title + Date.now(),
        author: user.email,
        title,
        body,
      };
      const newPosts = [...posts, newPost];

      await AsyncStorage.setItem("posts", JSON.stringify(newPosts));
      setPosts(newPosts);

      router.push("/posts");
    } catch (error) {
      throw Error(error.message);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <PostsContext.Provider value={{ posts, createPost }}>
      {children}
    </PostsContext.Provider>
  );
}
