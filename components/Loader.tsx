import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const Loader = ({message}:{message?:string}) => {
  return (
    <View className="my-auto mx-auto p-2">
              <ActivityIndicator
                className=""
                size={"large"}
                color={"black"}
              />
              {message &&
              <Text className='text-xs font-medium text-gray-400 text-center pt-2'>{message}</Text>
              }
            </View>
  )
}

export default Loader