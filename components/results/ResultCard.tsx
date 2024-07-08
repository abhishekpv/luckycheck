import { View, Text } from "react-native";
import React from "react";
import utils from "@/libs";

import ResultLottery from "./ResultLottery";

type Prize = {
  title: string;
  data: string[];
};

const ResultCard = ({
  item,
  isMain,
  lottery,
}: {
  item: Prize;
  isMain: boolean;
  lottery?: string;
}) => {
  const formattedTitle = utils.splitTitle(item.title);

  return (
    <View className="border-[1px] border-gray-100 rounded  bg-white my-1  mx-3  ">
      <View className="border-b-[1px] border-b-gray-50 flex-row space-x-3 justify-between items-center px-3 py-2">
        <View className="flex-row justify-between flex-1">
          <Text className="text-primary font-medium text-xl">
            {formattedTitle[0]}
          </Text>
          <View className="min-w-[75px]">
            <Text className="text-gray-500 text-[9px] font-medium">Amount</Text>
            <Text className="text-primary font-medium text-[16px]">
              {formattedTitle[1]}
            </Text>
          </View>
        </View>
        {/* <AntDesign name="circledown" size={24} color="black" /> */}
      </View>
      {!isMain && (
        <View className="py-2 px-5 items-center ">
          <Text className="text-xs font-semibold text-red-600">
            Below are the last 4 digits of the ticket number
          </Text>
        </View>
      )}
      <View className="py-2 px-5 flex-row flex-wrap justify-between">
        {item.data.map((value) => {
          const style =
            value === lottery ? "bg-green-200 border-green-500" : "";
          return <ResultLottery key={value} lottery={value} style={style} />;
        })}
      </View>
    </View>
  );
};

export default ResultCard;
