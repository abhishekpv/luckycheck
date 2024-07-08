import { View } from "react-native";
import React from "react";
import ResultCard from "./ResultCard";

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

const ResultsPage = ({ data }: { data: Response }) => {
  const isMain = data?.lotteryStatus?.category === "mainPrize";
  return (
    <View className=" my-3">
      {data.mainPrize.map((item) => {
        return (
          <ResultCard
            isMain={true}
            key={item.title}
            item={item}
            lottery={isMain ? data.lotteryStatus.lottery : undefined}
            // expanded={expanded ? item.title == expanded : false}
          />
        );
      })}
      {data.secondaryPrize.map((item) => {
        const lotteryEnding = data?.lotteryStatus?.lottery?.slice(-4);
        return (
          <ResultCard
            isMain={false}
            key={item.title}
            item={item}
            lottery={!isMain ? lotteryEnding : undefined}
            // expanded={expanded ? item.title == expanded : false}
          />
        );
      })}
    </View>
  );
};

export default ResultsPage;
