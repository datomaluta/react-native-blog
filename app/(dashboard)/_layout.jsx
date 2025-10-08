import { Stack, Tabs } from "expo-router";
import { StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import UserOnly from "../../components/auth/UserOnly";

export default function DashboardLayout() {
  return (
    <UserOnly>
      <StatusBar style="auto" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            // backgroundColor: theme.navBackground,
            paddingTop: 10,
            height: 90,
          },
          //   tabBarActiveTintColor: theme.iconColorFocused,
          //   tabBarInactiveTintColor: theme.iconColor,
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
                // color={focused ? theme.iconColorFocused : theme.iconColor}
              />
            ),
          }}
        />
      </Tabs>
    </UserOnly>
  );
}
