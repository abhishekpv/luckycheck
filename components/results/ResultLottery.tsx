import { View, Text } from "react-native";
import React from "react";

const ResultLottery = ({
  lottery,
  style,
}: {
  lottery: string;
  style?: string;
}) => {
  return (
    <View
      className={`w-[35vw] items-center flex-row justify-center m-1 h-10 rounded-sm p-2 border-[1px] border-gray-200 bg-white shadow-md shadow-gray-200 ${style} `}
    >
      <Text className="text-primary font-semibold text-sm text-center">
        {lottery}
      </Text>
    </View>
  );
};

export default ResultLottery;
