import { Image, ScrollView, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "@/components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

const App = () => {
  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="min-h-[85vh] h-full justify-center items-center w-full px-4">
          <Image
            source={images.logoSmall}
            resizeMode="contain"
            className="w-20 h-20"
          />
          <View className="relative mt-5">
            <Text className="text-2xl text-white font-bold text-center">
              Discover Your Winning Moment with{" "}
              <Text className="text-secondary-200 text-2xl font-bold">
                LuckyCheck
              </Text>
            </Text>
            <Text className="text-white text-xs m-5 text-center">Where creativity meets innovation: embark on a journey of hazzle free winning confirmation</Text>
          </View>
          <CustomButton title={"Explore"}
          containerStyles='w-full'
          handlePress={()=>{
            router.push('/home')
          }}
          />
        </View>
      </ScrollView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default App;
