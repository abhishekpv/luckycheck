import { View, Text, Pressable } from "react-native";
import React from "react";
import { router } from "expo-router";

type Scheme = {
  id: string;
  title: string;
  date: string;
  link: string;
};

const SchemeCard = ({
  lotteryNo,
  item,
}: {
  lotteryNo?: string;
  item: Scheme;
}) => {
  const formatTitle = (title: string) => {
    const splitArray = title.split(/[()]/);
    return { titleName: splitArray[0], titleCode: splitArray[1] };
  };

  const { titleName, titleCode } = formatTitle(item.title);
  return (
    <Pressable
      onPress={() => {
        router.push(
          `/results?schemeId=${item.id}${
            lotteryNo && `&lotteryNo=${lotteryNo}`
          }`
        );
      }}
      className="bg-white justify-center items-center w-full pt-5 my-2 rounded-md border-[1px] border-gray-100 shadow-md  overflow-hidden shadow-gray-300"
      key={item.id}
    >
      <View className="pb-2   border-b-[1px] w-full border-b-gray-50 flex-row justify-start px-3 ">
        <Text className="text-2xl font-bold text-gray-800 text-center ">
          {titleName}
        </Text>
      </View>
      <View className=" w-full px-5 flex-row justify-between items-center">
        <View>
          <Text className="text-[10px] font-semibold pt-2 text-gray-400">
            Code
          </Text>
          <Text className="text-sm font-bold  pb-4 text-gray-800">
            {titleCode}
          </Text>
        </View>
        <View>
          <Text className="text-[10px] font-semibold pt-2 text-gray-400">
            Date
          </Text>
          <Text className="text-sm font-bold  pb-4 text-gray-800">
            {item.date}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default SchemeCard;
