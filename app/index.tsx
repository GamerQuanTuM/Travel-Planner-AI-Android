
import { View, Text, Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

const Landing = () => {
    const router = useRouter()
  return (
    <View>
    <Image source={require("../assets/landing.jpeg")} className='w-full h-[400px]' />
    <View className='rounded-t-3xl h-full bg-white -mt-[20px]'>
        <View className='flex flex-col justify-center items-center h-1/4 gap-y-4 mt-5'>
            <Text className='font-extrabold text-3xl'>AI Travel Planner</Text>
            <View className='mb-5'>
                <Text className='text-base text-gray-400'>Discover your next adventure effortlessly.</Text>
                <Text className='text-base text-gray-400'>Personalised itinerary at your fingertips.</Text>
                <Text className='text-base text-gray-400'>Travel smarter with AI-driven-insights</Text>
            </View>

            <TouchableOpacity className='rounded-full w-[80%] h-14 bg-black flex items-center justify-center mt-4' onPress={() => router.push("/login")}>
                <Text className='text-white font-normal text-base'>Get Started</Text>
            </TouchableOpacity>
        </View>
    </View>
</View>
  )
}

export default Landing