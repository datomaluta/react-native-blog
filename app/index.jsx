import { Link } from "expo-router";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import ThemedView from "../components/ThemedView";
import ThemedText from "../components/ThemedText";
import { useUser } from "../hooks/useUser";
import Spacer from "../components/Spacer";

const Home = () => {
  const { user } = useUser();
  return (
    <>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Best Blog App Ever Existed</ThemedText>

        <ThemedText>Current User: {user?.email}</ThemedText>

        <Spacer />

        <Link style={styles.link} href="/login">
          <ThemedText>Login</ThemedText>
        </Link>

        <Link style={styles.link} href="/register">
          <ThemedText>Register</ThemedText>
        </Link>

        <Link style={styles.link} href="/profile">
          <ThemedText>Dashboard</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },

  link: {
    marginBottom: 20,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 6,
  },
});

export default Home;
