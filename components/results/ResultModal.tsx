import { View, Pressable } from "react-native";
import React, { SetStateAction } from "react";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import BetterLuckCard from "./BetterLuckCard";
import WinnerCard from "./WinnerCard";

type LotteryStatus = {
  lottery: string;
  title: string;
  category: string;
  data: string[];
};

const ResultModal = ({
  setIsOpen,
  lotteryStatus,
}: {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  lotteryStatus: LotteryStatus;
}) => {
  const pressed = useSharedValue<boolean>(false);
  const offsetX = useSharedValue<number>(0);
  const offsetY = useSharedValue<number>(0);

  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
    })
    .onChange((event) => {
      offsetX.value = event.translationX;
      offsetY.value = event.translationY;
    })
    .onFinalize(() => {
      offsetX.value = withSpring(1);
      offsetY.value = withSpring(1);
      pressed.value = false;
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: offsetX.value },
      { translateY: offsetY.value },
      //   { scale: withTiming(pressed.value ? 1.1 : 1) },
    ],
  }));
  return (
    <View
      className="h-[100vh] w-[100vw] pb-20"
      style={{ backgroundColor: "#00000080" }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <GestureDetector gesture={pan}>
          <Animated.View
            className="h-[50vh] w-[85vw] bg-white p-3 mx-auto my-auto relative rounded-md border border-gray-500"
            style={[animatedStyles]}
          >
            <Pressable
              className="absolute top-0 right-0 p-1 pb-3 pl-3"
              onPress={() => {
                setIsOpen(false);
              }}
            >
              <Ionicons name="close-circle" size={26} color="black" />
            </Pressable>
            <View>
              {lotteryStatus.lottery ? (
                <WinnerCard data={lotteryStatus} />
              ) : (
                <BetterLuckCard />
              )}
            </View>
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
      <StatusBar backgroundColor="#00000085" />
    </View>
  );
};

export default ResultModal;
