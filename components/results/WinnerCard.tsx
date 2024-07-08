import { View, Text } from "react-native";
import React from "react";
import utils from "@/libs";
import ResultLottery from "./ResultLottery";
import { FontAwesome6 } from "@expo/vector-icons";

type LotteryStatus = {
  lottery: string;
  title: string;
  category: string;
  data: string[];
};

const WinnerCard = ({ data }: { data: LotteryStatus }) => {
  const title = utils.splitTitle(data.title);
  return (
    <View className="justify-between items-center w-full relative">
      <View className="absolute top-14">
        <FontAwesome6 name="trophy" size={184} color="#f5f5f5" />
      </View>
      <Text className="text-3xl font-semibold text-black mt-20  ">
        Congratulations
      </Text>
      <View className=" w-full items-center justify-start pt-4 ">
        <Text className="text-4xl pl-2 font-bold text-gray-800  pb-1 text-center">
          You Won !
        </Text>
      </View>

      <View className="w-full items-center pt-14">
        <Text className="text-2xl font-bold pl-3 text-black">{title[1]}</Text>
        <Text className="text-lg font-semibold text-black">{title[0]}</Text>
        <ResultLottery key={data.lottery} lottery={data.lottery} />
      </View>
    </View>
  );
};

export default WinnerCard;
