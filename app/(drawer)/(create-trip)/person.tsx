import { View, Text, TouchableOpacity,ToastAndroid } from 'react-native'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Container } from '~/components/Container'
import useTripContext, { Person as PersonType } from '~/context/TripContext'

enum Active {
    ME = "Me",
    COUPLE = "Couple",
    FAMILY = "Family",
    FRIENDS = "Friends"
}

const Person = () => {
    const router = useRouter()
    const [active, setActive] = useState<Active | null>(null)
    const [error, setError] = useState<string | null>(null)

    const { setPerson } = useTripContext()

    const handlePress = () => {
        if (!active) {
            setError('Please select an option before continuing.')
            ToastAndroid.show('Please select an option before continuing.', ToastAndroid.TOP);
        } else {
            setPerson(active as PersonType)
            router.push("/(create-trip)/calendar")
            
        }
    }

    return (
        <Container navigate='/(create-trip)'>
            <View className='w-[95%] mx-auto'>
                <View>
                    <Text className='font-bold text-3xl'>Who's Travelling</Text>
                </View>
                <View className='mt-3'>
                    <Text className='font-bold text-xl'>Choose your travellers</Text>
                </View>
                <TouchableOpacity onPress={() => { setActive(Active.ME); setError(null); }}
                    className={`${active === Active.ME ? "border-[1px] border-slate-400" : "border-none"} 
                    mt-10 w-full bg-gray-200 h-20 mx-auto rounded-xl flex flex-row justify-between px-5`}>
                    <Text className='self-center'>Me</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setActive(Active.COUPLE); setError(null); }}
                    className={`${active === Active.COUPLE ? "border-[1px] border-slate-400" : "border-none"} 
                    mt-10 w-full bg-gray-200 h-20 mx-auto rounded-xl flex flex-row justify-between px-5`}>
                    <Text className='self-center'>Couple</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setActive(Active.FAMILY); setError(null); }}
                    className={`${active === Active.FAMILY ? "border-[1px] border-slate-400" : "border-none"} 
                    mt-10 w-full bg-gray-200 h-20 mx-auto rounded-xl flex flex-row justify-between px-5`}>
                    <Text className='self-center'>Family</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setActive(Active.FRIENDS); setError(null); }}
                    className={`${active === Active.FRIENDS ? "border-[1px] border-slate-400" : "border-none"} 
                     mt-10 w-full bg-gray-200 h-20 mx-auto rounded-xl flex flex-row justify-between px-5`}>
                    <Text className='self-center'>Friends</Text>
                </TouchableOpacity>

                <TouchableOpacity className='rounded-full w-full h-14 bg-black flex items-center justify-center mt-8' onPress={handlePress}>
                    <Text className='text-white font-normal text-base'>Continue</Text>
                </TouchableOpacity>
            </View>
        </Container>
    )
}

export default Person
