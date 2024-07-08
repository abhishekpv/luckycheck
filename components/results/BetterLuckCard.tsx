import { View, Text } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

const BetterLuckCard = () => {
  return (
    <View className="w-full py-5 justify-between  items-center h-full">
      <View className="items-center scale-125 pt-12 relative">
        <View className="absolute top-3">
          <Entypo name="emoji-sad" size={200} color="#f5f5f5" />
        </View>
        <Text className="text-red-500 font-semibold text-[24px] text-center mt-2 border-t-[3px] border-t-red-500 w-fit px-1 pt-1">
          BETTER
        </Text>
        <Text className="text-red-500 font-semibold text-4xl text-center">
          LUCK
        </Text>
        <Text className="text-red-500 font-semibold text-[18px] text-center border-b-[3px] border-b-red-500 px-1 pb-1">
          NEXT TIME
        </Text>
      </View>
      <Text className="text-center text-gray-300 font-bold text-xs px-8 ">
        Life is unfair but remember sometimes it is unfair in your favour.
      </Text>
    </View>
  );
};

export default BetterLuckCard;
