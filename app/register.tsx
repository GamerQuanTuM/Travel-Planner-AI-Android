import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { Container } from '~/components/Container'

const Register = () => {
    const router = useRouter()
    return (
        <Container>
            <View className=''>
                <Text className='font-bold text-3xl'>Create New Account</Text>
            </View>
            <View className='flex flex-col items-center justify-center mt-8 space-y-8'>
                <View className='flex flex-col w-full gap-y-2'>
                    <Text className='text-base font-medium text-gray-500 mx-2'>Email</Text>
                    <TextInput textContentType='emailAddress' className='border w-full h-12 rounded-xl px-5' />
                </View>
                <View className='flex flex-col w-full gap-y-2'>
                    <Text className='text-base font-medium text-gray-500 mx-2'>Username</Text>
                    <TextInput textContentType='username' className='border w-full h-12 rounded-xl px-5' />
                </View>
                <View className='flex flex-col w-full gap-y-2'>
                    <Text className='text-base font-medium text-gray-500 mx-2'>Password</Text>
                    <TextInput textContentType='password' className='border w-full h-12 rounded-xl px-5' />
                </View>
            </View>
            <View className='space-y-5 mt-10'>
                <TouchableOpacity className='rounded-full w-full h-14 bg-black flex items-center justify-center mt-4' onPress={() => router.push("/login")}>
                    <Text className='text-white font-normal text-base'>Create Account</Text>
                </TouchableOpacity>
                <TouchableOpacity className='rounded-full w-full h-14 bg-white border-[1px] border-gray-300 flex items-center justify-center mt-4' onPress={() => router.push("/login")}>
                    <Text className='text-black font-normal text-base'>Sign In</Text>
                </TouchableOpacity>
            </View>
        </Container>
    )
}

export default Register