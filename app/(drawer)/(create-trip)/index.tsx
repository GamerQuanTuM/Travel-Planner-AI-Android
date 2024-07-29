import { View, Text } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import { Entypo } from '@expo/vector-icons';

import { Container } from '~/components/Container'
import { TouchableOpacity } from 'react-native-gesture-handler';

const Home = () => {
    const router = useRouter()
    return (
        <Container>
            <View className='mb-40'>
                <Text className='font-bold text-3xl'>My Trips</Text>
            </View>

            <View className='flex flex-col items-center justify-center mt-40 gap-y-3 w-[80%] mx-auto'>
                <Entypo name="location-pin" size={35} color="black" />
            </View>

            <View className='flex flex-col items-center justify-center mt-5'>
                <Text className='font-semibold text-2xl text-center'>Generate a Trip</Text>
                <Text className='font-medium text-base text-gray-500 mt-2'>Looks like its time to plan a new travel experience! Get started below</Text>
            </View>

            <TouchableOpacity onPress={()=>router.push("/(create-trip)/person")} className='rounded-full w-[80%] h-14 bg-black flex items-center justify-center mt-12 mx-auto'>
                <Text className='text-white font-normal text-base'>Create Trip</Text>
            </TouchableOpacity>
        </Container>
    )
}

export default Home