"use client";

import { Text, View, Image, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const generateHeatmapData = () => {
  const data = {};
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 120);

  for (let i = 0; i < 120; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const dateStr = date.toISOString().split("T")[0];
    const activityLevel = Math.floor(Math.random() * 4);
    data[dateStr] = activityLevel;
  }

  return data;
};

const heatmapData = generateHeatmapData();

// Calculate day count (dummy: assuming app started 78 days ago)
const dayCount = 78;

export default function WelcomeScreen() {
  const router = useRouter();

  const weeks = [];
  const today = new Date();
  let currentWeek = [];

  for (let i = 0; i < 112; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];

    currentWeek.unshift({
      date: dateStr,
      level: heatmapData[dateStr] || 0,
    });

    if (currentWeek.length === 7 || i === 111) {
      weeks.unshift([...currentWeek]);
      currentWeek = [];
    }
  }

  const getHeatmapColor = (level) => {
    switch (level) {
      case 0:
        return "bg-gray-100";
      case 1:
        return "bg-emerald-200";
      case 2:
        return "bg-emerald-400";
      case 3:
        return "bg-emerald-600";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <ScrollView className="flex-1 bg-gradient-to-b from-emerald-50 to-white">
      <StatusBar style="dark" />

      <View className="px-5 pt-8 pb-12">
        {/* Day counter and profile */}
        <View className="flex-row justify-between items-center mb-8">
          <View className="bg-emerald-500 px-4 py-2 rounded-full">
            <Text className="text-white font-bold">Day {dayCount}</Text>
          </View>

          <View className="w-12 h-12 bg-emerald-500 rounded-full items-center justify-center shadow-sm">
            <Image
              source={require("../assets/images/ddabongcat.png")}
              className="w-10 h-10 rounded-full"
              style={{ opacity: 0.9 }}
            />
          </View>
        </View>

        {/* Welcome message */}
        <View className="mb-8">
          <Text className="text-emerald-800 text-3xl font-bold mb-2">Welcome to Day Mark</Text>
          <Text className="text-gray-600 text-lg">가볍게 하루를 기록해보세요</Text>
        </View>

        {/* Heatmap */}
        <View className="mb-8">
          <Text className="text-emerald-800 text-xl font-semibold mb-4">나의 메모 활동 기록</Text>

          <View className="bg-white p-4 rounded-xl shadow-sm">
            {/* Days of week labels */}
            <View className="flex-row mb-2">
              <View style={{ width: 20 }} />
              <Text className="text-gray-400 text-xs" style={{ width: 14, marginHorizontal: 2 }}>
                M
              </Text>
              <Text className="text-gray-400 text-xs" style={{ width: 14, marginHorizontal: 2 }}>
                T
              </Text>
              <Text className="text-gray-400 text-xs" style={{ width: 14, marginHorizontal: 2 }}>
                W
              </Text>
              <Text className="text-gray-400 text-xs" style={{ width: 14, marginHorizontal: 2 }}>
                T
              </Text>
              <Text className="text-gray-400 text-xs" style={{ width: 14, marginHorizontal: 2 }}>
                F
              </Text>
              <Text className="text-gray-400 text-xs" style={{ width: 14, marginHorizontal: 2 }}>
                S
              </Text>
              <Text className="text-gray-400 text-xs" style={{ width: 14, marginHorizontal: 2 }}>
                S
              </Text>
            </View>

            {/* Heatmap grid */}
            <View className="flex-row flex-wrap">
              {weeks.map((week, weekIndex) => (
                <View key={`week-${weekIndex}`} className="flex-col mr-1">
                  {week.map((day, dayIndex) => (
                    <View
                      key={`day-${day.date}`}
                      className={`${getHeatmapColor(day.level)} w-3.5 h-3.5 rounded-sm m-0.5`}
                    />
                  ))}
                </View>
              ))}
            </View>

            <View className="flex-row justify-between items-center mt-4">
              <Text className="text-gray-500 text-xs">Less</Text>
              <View className="flex-row">
                <View className="bg-gray-100 w-3 h-3 rounded-sm mx-0.5" />
                <View className="bg-emerald-200 w-3 h-3 rounded-sm mx-0.5" />
                <View className="bg-emerald-400 w-3 h-3 rounded-sm mx-0.5" />
                <View className="bg-emerald-600 w-3 h-3 rounded-sm mx-0.5" />
              </View>
              <Text className="text-gray-500 text-xs">More</Text>
            </View>
          </View>
        </View>

        {/* Quick stats */}
        <View className="flex-row justify-between mb-8">
          <View className="bg-white p-4 rounded-xl shadow-sm flex-1 mr-2">
            <Ionicons name="document-text-outline" size={24} color="#10b981" />
            <Text className="text-2xl font-bold text-gray-800 mt-2">24</Text>
            <Text className="text-gray-500">Total Memos</Text>
          </View>
          <View className="bg-white p-4 rounded-xl shadow-sm flex-1 ml-2">
            <Ionicons name="trending-up-outline" size={24} color="#10b981" />
            <Text className="text-2xl font-bold text-gray-800 mt-2">5</Text>
            <Text className="text-gray-500">This Week</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
