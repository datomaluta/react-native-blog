import { Stack, Tabs } from "expo-router";
import { StatusBar, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import UserOnly from "../../components/auth/UserOnly";
import { Colors } from "../../constants/Colors";

export default function DashboardLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <UserOnly>
      <StatusBar style="auto" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.navBackground,
            paddingTop: 10,
            height: 90,
          },
          tabBarActiveTintColor: theme.tabIconSelected,
          tabBarInactiveTintColor: theme.tabIconDefault,
        }}
      >
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={24}
                name={focused ? "person" : "person-outline"}
                color={focused ? theme.tabIconSelected : theme.tabIconDefault}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="posts"
          options={{
            title: "Posts",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={24}
                name={focused ? "book" : "book-outline"}
                color={focused ? theme.tabIconSelected : theme.tabIconDefault}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={24}
                name={focused ? "create" : "create-outline"}
                color={focused ? theme.tabIconSelected : theme.tabIconDefault}
              />
            ),
          }}
        />

        <Tabs.Screen name="posts/[id]" options={{ href: null }} />
      </Tabs>
    </UserOnly>
  );
}
