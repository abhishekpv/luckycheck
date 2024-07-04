import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { formatLottery, validateLottery } from "@/libs/formatLottery";
import { router } from "expo-router";

const Home = () => {
  const [value, setValue] = useState<any>();
  const [error, setError] = useState<boolean>(false);
  return (
    <SafeAreaView>
      <View className="w-full p-5 pt-16 justify-start h-full">
        <View className="w-full justify-center gap-2 py-5">
          <Text className="text-3xl font-bold text-gray-900 ">
            Enter Lottery Details
          </Text>
          <Text className="text-base font-medium text-gray-400 ">
            Enter the details of the lottery you want to check.
          </Text>
        </View>
        <View className=" w-full mt-10">
          <View
            className={`h-16 w-full bg-white rounded-md shadow-sm duration-500   border-[1px] border-gray-100 justify-center px-3 focus:border-gray-400 ${
              error && "border-red-500"
            }`}
          >
            <TextInput
              className={`font-medium text-base duration-500 text-black  ${
                value && " text-3xl"
              } ${error && "text-red-500"}`}
              value={value}
              style={value && { letterSpacing: 5 }}
              onChangeText={(e: any) => {
                setError(false);
                setValue(formatLottery(e.toUpperCase()));
              }}
              placeholder="Enter lottery number"
              placeholderTextColor={"#b5b5b5"}
            />
          </View>
          {error && (
            <Text className="text-red-500 font-medium mt-1 text-xs">
              Enter valid lottery number (FG 957823)
            </Text>
          )}
          <TouchableOpacity
            className={`bg-black px-3 h-16 rounded-md my-5 items-center justify-center `}
            onPress={() => {
              const result = validateLottery(value);
              !result && setError(true);
              result && router.push(`/select-scheme?lotteryNo=${result[0]}`);
            }}
            activeOpacity={0.8}
            disabled={!value}
          >
            <Text className={`text-white tracking-widest text-xl font-bold`}>
              Check Results
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Home;
