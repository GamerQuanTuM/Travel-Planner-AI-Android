import { View, Text, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { Link, useRouter } from 'expo-router'

import useAuthContext from '~/context/AuthContext'
import { Container } from '~/components/Container'
import getFontSize from '~/functions/fontSizeResponsive'
import validateUserInput from '~/functions/validateUserInput'

const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");

    const { login } = useAuthContext();

    const handleLogin = () => {
        // const validationErrors = validateUserInput({ email, password });

        // if (validationErrors) {
        //     if (validationErrors.email) {
        //         ToastAndroid.show(validationErrors.email, ToastAndroid.SHORT);
        //         setError(validationErrors.email)
        //     } else if (validationErrors.password) {
        //         ToastAndroid.show(validationErrors.password, ToastAndroid.SHORT);
        //         setError(validationErrors.email)
        //     }
        // } else {
        login({ email, password });
        // }
    }
    return (
        <Container>
            <View className='flex flex-col gap-y-8'>
                <Text style={{ fontSize: getFontSize(30) }} className='font-bold text-3xl'>Let's Sign You In</Text>
                <View className='flex-flex-col gap-y-3'>
                    <Text style={{ fontSize: getFontSize(24) }} className='font-medium text-gray-400'>Welcome Back</Text>
                    <Text style={{ fontSize: getFontSize(24) }} className='font-medium text-gray-400'>You've been missed</Text>
                </View>
            </View>
            <View className='flex flex-col items-center justify-center mt-16 space-y-8'>
                <View className='flex flex-col w-full gap-y-2'>
                    <Text style={{ fontSize: getFontSize(16) }} className='font-medium text-gray-500 mx-2'>Email</Text>
                    <TextInput style={{ fontSize: getFontSize(20) }} onChangeText={(email) => setEmail(email)} textContentType='emailAddress' className='border w-full h-12 rounded-xl px-5' />
                </View>
                <View className='flex flex-col w-full gap-y-2'>
                    <Text style={{ fontSize: getFontSize(16) }} className='font-medium text-gray-500 mx-2'>Password</Text>
                    <TextInput style={{ fontSize: getFontSize(20) }} onChangeText={(password) => setPassword(password)} textContentType='password' className='border w-full h-12 rounded-xl px-5' />
                </View>
            </View>
            <View className='space-y-5 mt-10'>
                <Link href={"/(drawer)"} asChild replace>
                    <TouchableOpacity className='rounded-full w-full h-14 bg-black flex items-center justify-center mt-4' onPress={handleLogin}>
                        <Text style={{ fontSize: getFontSize(16) }} className='text-white font-normal'>Login</Text>
                    </TouchableOpacity>
                </Link>
                <TouchableOpacity className='rounded-full w-full h-14 bg-white border-[1px] border-gray-300 flex items-center justify-center mt-4' onPress={() => router.push("/register")}>
                    <Text style={{ fontSize: getFontSize(16) }} className='text-black font-normal'>Create Account</Text>
                </TouchableOpacity>
            </View>
        </Container >
    )
}

export default Login