import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import LotteryCard from "@/components/lotteryCard";
import Loader from "@/components/Loader";
import SchemeCard from "@/components/SchemeCard";
import axios from "axios";
import { endpoints } from "@/constants";

type Scheme = {
  id: string;
  title: string;
  date: string;
  link: string;
};

const SelectLotteries = () => {
  const [lotteries, setLotteries] = useState<Scheme[]>();
  const { lotteryNo } = useLocalSearchParams();

  const fetchData = async () => {
    const result = await axios.get(endpoints.LOTTERIES_ENDPOINT);
    setLotteries(result.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <View className="w-full justify-center min-h-[100vh] ">
        <View className="p-4 pb-0 pt-10 w-full justify-center border-b-[1px] border-b-gray-100">
          <LotteryCard lotteryNo={lotteryNo as string} />
          <Text className="pb-2  pt-5 font-bold text-xl">Select Scheme </Text>
        </View>
        <ScrollView
          className=" px-4  "
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ flex: 1 }}
        >
          {lotteries ? (
            lotteries.map((item) => {
              return (
                <SchemeCard
                  item={item}
                  key={item.id}
                  lotteryNo={lotteryNo as string}
                />
              );
            })
          ) : (
            <Loader message="Fetching schemes" />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SelectLotteries;
