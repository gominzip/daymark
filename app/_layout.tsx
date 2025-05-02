import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import "./global.css";

export default function RootLayoutNav() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#10b981",
        tabBarInactiveTintColor: "#6b7280",
        tabBarStyle: {
          backgroundColor: "#f8fafc",
          borderTopWidth: 1,
          borderTopColor: "#e2e8f0",
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerStyle: {
          backgroundColor: "#10b981",
        },
        headerTintColor: "#ffffff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerRight: () => (
          <TouchableOpacity
            style={{ marginRight: 16 }}
            onPress={() => {
              console.log("Create new memo");
            }}
          >
            <Ionicons name="add-circle" size={24} color="#ffffff" />
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Day Mark",
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />,
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="memos"
        options={{
          title: "My Memos",
          tabBarIcon: ({ color }) => <Ionicons name="list-outline" size={24} color={color} />,
          tabBarLabel: "Memos",
        }}
      />
    </Tabs>
  );
}
