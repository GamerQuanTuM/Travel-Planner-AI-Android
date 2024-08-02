import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import { Link, useRouter } from 'expo-router'

import { Container } from '~/components/Container'
import useAuthContext from '~/context/AuthContext'
import getFontSize from '~/functions/fontSizeResponsive'
import validateUserInput from '~/functions/validateUserInput'

const Register = () => {
    const router = useRouter()
    const { register } = useAuthContext()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    const handleRegister = () => {
        // const validationErrors = validateUserInput({ email, name, password });

        // if (validationErrors) {
        //     if (validationErrors.email) {
        //         ToastAndroid.show(validationErrors.email, ToastAndroid.SHORT);
        //     } else if (validationErrors.name) {
        //         ToastAndroid.show(validationErrors.name, ToastAndroid.SHORT);
        //     } else if (validationErrors.password) {
        //         ToastAndroid.show(validationErrors.password, ToastAndroid.SHORT);
        //     }
        // } else {
            register({ email, name, password });
        // }
    };

    
    return (
        <Container>
            <View className=''>
                <Text style={{ fontSize: getFontSize(30) }} className='font-bold text-3xl'>Create New Account</Text>
            </View>
            <View className='flex flex-col items-center justify-center mt-8 space-y-8'>
                <View className='flex flex-col w-full gap-y-2'>
                    <Text style={{ fontSize: getFontSize(16) }} className='font-medium text-gray-500 mx-2'>Email</Text>
                    <TextInput style={{ fontSize: getFontSize(20) }} onChangeText={(email) => setEmail(email)} textContentType='emailAddress' className='border w-full h-12 rounded-xl px-5' />
                </View>
                <View className='flex flex-col w-full gap-y-2'>
                    <Text style={{ fontSize: getFontSize(16) }} className='font-medium text-gray-500 mx-2'>Username</Text>
                    <TextInput style={{ fontSize: getFontSize(20) }} onChangeText={(name) => setName(name)} textContentType='username' className='border w-full h-12 rounded-xl px-5' />
                </View>
                <View className='flex flex-col w-full gap-y-2'>
                    <Text style={{ fontSize: getFontSize(16) }} className='font-medium text-gray-500 mx-2'>Password</Text>
                    <TextInput secureTextEntry={true} style={{ fontSize: getFontSize(20) }} onChangeText={(password) => setPassword(password)} textContentType='password' className='border w-full h-12 rounded-xl px-5' />
                </View>
            </View>
            <View className='space-y-5 mt-10'>
                <Link href={"/(drawer)"} asChild replace>
                    <TouchableOpacity className='rounded-full w-full h-14 bg-black flex items-center justify-center mt-4' onPress={handleRegister}>
                        <Text style={{ fontSize: getFontSize(16) }} className='text-white font-normal'>Create Account</Text>
                    </TouchableOpacity>
                </Link>
                <TouchableOpacity className='rounded-full w-full h-14 bg-white border-[1px] border-gray-300 flex items-center justify-center mt-4' onPress={() => router.push("/login")}>
                    <Text style={{ fontSize: getFontSize(16) }} className='text-black font-normal'>Sign In</Text>
                </TouchableOpacity>
            </View>
        </Container>
    )
}

export default Register