import { View, Text, ImageBackground } from "react-native";
import React from "react";
import { images } from "@/constants";

const LotteryCard = ({ lotteryNo }: { lotteryNo: string }) => {
  return (
    <View
      className={` rounded-md w-full overflow-hidden relative shadow-md shadow-gray-500`}
    >
      <ImageBackground source={images.blackBg} resizeMode="cover">
        <View className="w-full h-32 flex-row justify-between p-3">
          <View className=" justify-between py-2 px-3">
            <Text className="text-white font-bold tracking-[7px]">
              {lotteryNo}
            </Text>
            <Text className="text-gray-300 tracking-[3] font-bold text-lg">
              *******
            </Text>
          </View>
          <View className="bg-white opacity-90 h-full justify-between p-1 rounded-sm">
            <ImageBackground source={images.splash} tintColor={"black"}>
              <Text className="font-semibold  text-end pb-3 text-gray-400">
                Luck
              </Text>
              <Text className="font-semibold text-xs px-1  text-end pt-12">
                {lotteryNo}
              </Text>
            </ImageBackground>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LotteryCard;
