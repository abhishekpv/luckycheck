import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ResultsPage from "@/components/results/resultsPage";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import { endpoints } from "@/constants";
import Loader from "@/components/Loader";
import { Gesture } from "react-native-gesture-handler";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import ResultModal from "@/components/results/ResultModal";

type LotteryStatus = {
  lottery: string;
  title: string;
  category: string;
  data: string[];
};

type Prize = {
  title: string;
  data: string[];
};

type Response = {
  lotteryStatus: LotteryStatus;
  mainPrize: Prize[];
  secondaryPrize: Prize[];
};

const Results = () => {
  const { lotteryNo, schemeId } = useLocalSearchParams();
  const [data, setData] = useState<Response>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const fetchData = async () => {
    const result = await axios.get(
      `${endpoints.WINNER_ENDPOINT}?pdf=${schemeId}${
        lotteryNo && `&lottery=${lotteryNo}`
      }`
    );
    setData(result.data.data);
  };

  useEffect(() => {
    fetchData();
  }, [schemeId]);

  const pan = Gesture.Pan();

  return (
    <SafeAreaView>
      {data ? (
        <View className="min-h-[100vh] relative">
          <ScrollView
            className=""
            contentContainerStyle={{ flexGrow: 1 }}
            style={{ flex: 1 }}
          >
            <ResultsPage data={data} />
          </ScrollView>
          <View
            className={`border-t-[1px] border-gray-300 shadow-md shadow-gray-500 bg-white py-2 `}
          >
            <Pressable
              className="bg-primary shadow-md shadow-gray-500 my-3 mx-8 rounded items-center py-2 justify-center"
              onPress={() => {
                setIsOpen(!isOpen);
              }}
            >
              <Text className="text-white font-semibold text-xl">
                View Results
              </Text>
            </Pressable>
          </View>
          {isOpen && (
            <Animated.View
              entering={FadeInDown}
              exiting={FadeOutDown}
              className={"absolute"}
            >
              <ResultModal
                setIsOpen={setIsOpen}
                lotteryStatus={data.lotteryStatus}
              />
            </Animated.View>
          )}
        </View>
      ) : (
        <View className="min-h-[80vh]">
          <Loader message="fetching results" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Results;
