import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ResultsPage from "@/components/results/resultsPage";
import { useLocalSearchParams } from "expo-router";
import { findWinner } from "@/libs/findWinner";

const Results = () => {
  const { lotteryNo, schemeId } = useLocalSearchParams();
  const [data, setData] = useState<any>();

  const fetchData = async () => {
    const result = await findWinner(schemeId as string);
    setData(result.data);
  };
  useEffect(() => {
    fetchData();
  }, [schemeId]);
  return (
    <SafeAreaView>
      <ScrollView className="flex-1 min-h-[100vh]">
        <ResultsPage />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Results;
