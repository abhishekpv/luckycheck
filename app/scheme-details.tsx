import { View, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import { endpoints } from "@/constants";
import ResultsPage from "@/components/results/resultsPage";
import Loader from "@/components/Loader";

type Prize = {
  title: string;
  data: string[];
};

type Response = {
  lotteryStatus: any;
  mainPrize: Prize[];
  secondaryPrize: Prize[];
};

const SchemeDetails = () => {
  const { schemeId } = useLocalSearchParams();
  const [data, setData] = useState<Response>();

  const fetchData = async () => {
    const result = await axios.get(
      `${endpoints.WINNER_ENDPOINT}?pdf=${schemeId}`
    );
    setData(result.data.data);
  };

  useEffect(() => {
    fetchData();
  }, [schemeId]);

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
        </View>
      ) : (
        <View className="min-h-[80vh]">
          <Loader message="fetching results" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SchemeDetails;
