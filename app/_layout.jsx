import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";
import { StatusBar } from "expo-status-bar";
import { UserProvider } from "../contexts/userContext";
import { PostsProvider } from "../contexts/postsContext";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <UserProvider>
      <PostsProvider>
        <StatusBar style="auto" />
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: theme.background },
            headerTintColor: theme.tint,
          }}
        >
          <Stack.Screen name="index" options={{ title: "Home" }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
        </Stack>
      </PostsProvider>
    </UserProvider>
  );
}
