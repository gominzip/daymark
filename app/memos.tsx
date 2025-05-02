import { useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import MemoItem from "../components/MemoItem";

const dummyMemos = [
  {
    id: "1",
    title: "운영체제 복습",
    content: "챕터 5까지 정리하고 문제 유형 정리 및 암기",
    date: "2025-05-01",
    category: "work",
  },
  {
    id: "2",
    title: "React Native 스터디",
    content: "컴포넌트 분리와 상태 관리 방식 토론",
    date: "2025-05-01",
    category: "work",
  },
  {
    id: "3",
    title: "동아리 회의",
    content: "다음 행사 기획 및 역할 분담",
    date: "2025-05-01",
    category: "work",
  },
  {
    id: "4",
    title: "엘리펀트 헤드 독서",
    content: "3장까지 읽고 인상 깊은 구절 정리",
    date: "2025-05-02",
    category: "personal",
  },
  {
    id: "5",
    title: "산책 및 리프레시",
    content: "공원 산책 후 차 한잔",
    date: "2025-05-02",
    category: "personal",
  },
];

export default function MemosScreen() {
  const [memos, setMemos] = useState(dummyMemos);
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredMemos = activeFilter === "all" ? memos : memos.filter((memo) => memo.category === activeFilter);

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />

      <View className="bg-emerald-50 py-4 px-4">
        <View className="flex-row justify-between mb-2">
          <Text className="text-emerald-800 text-lg font-semibold">My Memos ({filteredMemos.length})</Text>
          <TouchableOpacity>
            <Ionicons name="search-outline" size={22} color="#047857" />
          </TouchableOpacity>
        </View>

        <View className="flex-row gap-1 mt-2">
          <TouchableOpacity
            className={`px-4 py-2 rounded-full ${activeFilter === "all" ? "bg-emerald-500" : "bg-gray-200"}`}
            onPress={() => setActiveFilter("all")}
          >
            <Text className={activeFilter === "all" ? "text-white" : "text-gray-700"}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`px-4 py-2 rounded-full ${activeFilter === "work" ? "bg-emerald-500" : "bg-gray-200"}`}
            onPress={() => setActiveFilter("work")}
          >
            <Text className={activeFilter === "work" ? "text-white" : "text-gray-700"}>Work</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`px-4 py-2 rounded-full ${activeFilter === "personal" ? "bg-emerald-500" : "bg-gray-200"}`}
            onPress={() => setActiveFilter("personal")}
          >
            <Text className={activeFilter === "personal" ? "text-white" : "text-gray-700"}>Personal</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredMemos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MemoItem memo={item} />}
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
        ItemSeparatorComponent={() => <View className="h-4" />}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-20">
            <Ionicons name="document-text-outline" size={64} color="#d1d5db" />
            <Text className="text-gray-400 mt-4 text-lg">No memos found</Text>
          </View>
        }
      />
    </View>
  );
}
