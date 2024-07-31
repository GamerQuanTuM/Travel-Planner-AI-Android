import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import { Entypo, AntDesign } from '@expo/vector-icons';

import { Container } from '~/components/Container'
import getFontSize from '~/functions/fontSizeResponsive';

const Home = () => {
    const router = useRouter()
    return (
        <Container>
            <View className='mb-40'>
                <View className='w-full flex flex-row items-center justify-between'>
                    <Text style={{ fontSize: getFontSize(30) }} className='font-bold'>Home</Text>
                    <TouchableOpacity onPress={()=>router.push("/modal")}>
                        <AntDesign name="infocirlce" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            <View className='flex flex-col items-center justify-center mt-40 gap-y-3 w-[80%] mx-auto'>
                <Entypo name="location-pin" size={35} color="black" />
            </View>

            <View className='flex flex-col items-center justify-center mt-5'>
                <Text style={{ fontSize: getFontSize(24) }} className='font-semibold text-center'>Generate a Trip</Text>
                <Text style={{ fontSize: getFontSize(16) }} className='font-medium text-gray-500 mt-2'>Looks like its time to plan a new travel experience! Get started below</Text>
            </View>

            <TouchableOpacity onPress={() => router.push("/(create-trip)/places")} className='rounded-full w-[80%] h-14 bg-black flex items-center justify-center mt-12 mx-auto'>
                <Text style={{ fontSize: getFontSize(16) }} className='text-white font-normal'>Create Trip</Text>
            </TouchableOpacity>
        </Container>
    )
}

export default Home