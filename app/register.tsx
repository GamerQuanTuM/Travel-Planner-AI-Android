import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { Link, useRouter } from 'expo-router'

import { Container } from '~/components/Container'
import useAuthContext from '~/context/AuthContext'

const Register = () => {
    const router = useRouter()
    const { register } = useAuthContext()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    return (
        <Container>
            <View className=''>
                <Text className='font-bold text-3xl'>Create New Account</Text>
            </View>
            <View className='flex flex-col items-center justify-center mt-8 space-y-8'>
                <View className='flex flex-col w-full gap-y-2'>
                    <Text className='text-base font-medium text-gray-500 mx-2'>Email</Text>
                    <TextInput onChangeText={(email) => setEmail(email)} textContentType='emailAddress' className='border w-full h-12 rounded-xl px-5 text-xl' />
                </View>
                <View className='flex flex-col w-full gap-y-2'>
                    <Text className='text-base font-medium text-gray-500 mx-2'>Username</Text>
                    <TextInput onChangeText={(name) => setName(name)} textContentType='username' className='border w-full h-12 rounded-xl px-5 text-xl' />
                </View>
                <View className='flex flex-col w-full gap-y-2'>
                    <Text className='text-base font-medium text-gray-500 mx-2'>Password</Text>
                    <TextInput onChangeText={(password) => setPassword(password)} textContentType='password' className='border w-full h-12 rounded-xl px-5 text-xl' />
                </View>
            </View>
            <View className='space-y-5 mt-10'>
                <Link href={"/(drawer)"} asChild replace>
                    <TouchableOpacity className='rounded-full w-full h-14 bg-black flex items-center justify-center mt-4' onPress={() => register({ email, name, password })}>
                        <Text className='text-white font-normal text-base'>Create Account</Text>
                    </TouchableOpacity>
                </Link>
                <TouchableOpacity className='rounded-full w-full h-14 bg-white border-[1px] border-gray-300 flex items-center justify-center mt-4' onPress={() => router.push("/login")}>
                    <Text className='text-black font-normal text-base'>Sign In</Text>
                </TouchableOpacity>
            </View>
        </Container>
    )
}

export default Register