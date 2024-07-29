import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Link, useRouter } from 'expo-router'
import useAuthContext from '~/context/AuthContext'
import { Container } from '~/components/Container'

const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { login,user } = useAuthContext();

    return (
        <Container>
            <View className='flex flex-col gap-y-8'>
                <Text className='font-bold text-3xl'>Let's Sign You In</Text>
                <View className='flex-flex-col gap-y-3'>
                    <Text className='font-medium text-2xl text-gray-400'>Welcome Back</Text>
                    <Text className='font-medium text-2xl text-gray-400'>You've been missed</Text>
                </View>
            </View>
            <View className='flex flex-col items-center justify-center mt-16 space-y-8'>
                <View className='flex flex-col w-full gap-y-2'>
                    <Text className='text-base font-medium text-gray-500 mx-2'>Email</Text>
                    <TextInput onChangeText={(email) => setEmail(email)} textContentType='emailAddress' className='border w-full h-12 rounded-xl px-5' />
                </View>
                <View className='flex flex-col w-full gap-y-2'>
                    <Text className='text-base font-medium text-gray-500 mx-2'>Password</Text>
                    <TextInput onChangeText={(password) => setPassword(password)} textContentType='password' className='border w-full h-12 rounded-xl px-5' />
                </View>
            </View>
            <View className='space-y-5 mt-10'>
                <Link href={"/(drawer)"} asChild replace>
                    <TouchableOpacity className='rounded-full w-full h-14 bg-black flex items-center justify-center mt-4' onPress={() => login({ email, password })}>
                        <Text className='text-white font-normal text-base'>Login</Text>
                    </TouchableOpacity>
                </Link>
                <TouchableOpacity className='rounded-full w-full h-14 bg-white border-[1px] border-gray-300 flex items-center justify-center mt-4' onPress={() => router.push("/register")}>
                    <Text className='text-black font-normal text-base'>Create Account</Text>
                </TouchableOpacity>
            </View>
        </Container >
    )
}

export default Login