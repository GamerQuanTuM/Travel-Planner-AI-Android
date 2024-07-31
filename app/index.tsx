
import React from 'react'
import { View, Text, Image, TouchableOpacity, PixelRatio } from 'react-native'
import { Redirect, useRouter } from 'expo-router'
import useAuthContext from '~/context/AuthContext'
import getFontSize from '~/functions/fontSizeResponsive'

const Landing = () => {
    const router = useRouter()
    const { user } = useAuthContext();

    if (user) return <Redirect href={"/(drawer)"} />
    return (
        <View>
            <Image source={require("../assets/landing.jpeg")} className='w-full h-[400px]' />
            <View className='rounded-t-3xl h-full bg-white -mt-[20px]'>
                <View className='flex flex-col justify-center items-center h-1/4 gap-y-4 mt-5'>
                    <Text style={{
                        fontSize: getFontSize(30)
                    }} className='font-extrabold'>AI Travel Planner</Text>
                    <View className='mb-5'>
                        <Text style={{
                            fontSize: getFontSize(16)
                        }} className='text-gray-400'>Discover your next adventure effortlessly.</Text>
                        <Text style={{
                            fontSize: getFontSize(16)
                        }} className=' text-gray-400'>Personalised itinerary at your fingertips.</Text>
                        <Text style={{
                            fontSize: getFontSize(16)
                        }} className=' text-gray-400'>Travel smarter with AI-driven-insights</Text>
                    </View>

                    <TouchableOpacity className='rounded-full w-[80%] h-14 bg-black flex items-center justify-center mt-4' onPress={() => router.push("/login")}>
                        <Text style={{
                             fontSize: getFontSize(16) 
                        }} className='text-white font-normal'>Get Started</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Landing
