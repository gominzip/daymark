import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type MemoItemProps = {
  memo: {
    id: string;
    title: string;
    content: string;
    date: string;
    category: string;
  };
};

export default function MemoItem({ memo }: MemoItemProps) {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "work":
        return "briefcase-outline";
      case "personal":
        return "person-outline";
      default:
        return "document-text-outline";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "work":
        return "bg-blue-100 text-blue-800";
      case "personal":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <TouchableOpacity
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      onPress={() => console.log(`Memo ${memo.id} pressed`)}
    >
      <View className="p-4">
        <View className="flex-row justify-between items-start mb-2">
          <Text className="text-lg font-semibold text-gray-800 flex-1 mr-2">{memo.title}</Text>
          <View className={`px-2 py-1 rounded-full ${getCategoryColor(memo.category).split(" ")[0]}`}>
            <Text className={`text-xs font-medium ${getCategoryColor(memo.category).split(" ")[1]}`}>
              {memo.category.charAt(0).toUpperCase() + memo.category.slice(1)}
            </Text>
          </View>
        </View>

        <Text className="text-gray-600 mb-3" numberOfLines={2}>
          {memo.content}
        </Text>

        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Ionicons name={getCategoryIcon(memo.category)} size={16} color="#6b7280" />
            <Text className="text-gray-500 text-xs ml-1">{formatDate(memo.date)}</Text>
          </View>

          <View className="flex-row">
            <TouchableOpacity className="mr-4" onPress={() => console.log(`Edit memo ${memo.id}`)}>
              <Ionicons name="create-outline" size={18} color="#10b981" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log(`Delete memo ${memo.id}`)}>
              <Ionicons name="trash-outline" size={18} color="#ef4444" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View className="h-1 bg-gradient-to-r from-emerald-400 to-green-300" />
    </TouchableOpacity>
  );
}
