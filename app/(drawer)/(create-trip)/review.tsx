import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'

import { Container } from '~/components/Container'
import useTripContext from '~/context/TripContext'
import insertLineBreaks from '~/functions/insertLineBreaks'
import getFontSize from '~/functions/fontSizeResponsive'

const Review = () => {
    const { place, duration, boarding, budget, person, handleGenerateTrip } = useTripContext();
    return (
        <Container>
            <View className='w-[95%] mx-auto'>
                <View>
                    <Text style={{ fontSize: getFontSize(30) }} className='font-bold'>Review Your Trip</Text>
                </View>
                <View className='mt-5'>
                    <Text style={{ fontSize: getFontSize(20) }} className='font-bold'>Before generating your trip, please review your selection</Text>
                </View>

                <View className='mt-7'>
                    <View className='flex flex-col gap-y-4'>
                        <Card navigate='/(create-trip)/places' icon='🏙️' heading='Destination' description={place as string || ""} />
                        <Card navigate='/(create-trip)/places' icon='🏡' heading='Origin' description={boarding as string || ""} />
                        <Card navigate='/(create-trip)/calendar' icon='📅' heading='Travel Date' description={`${duration as string || ""} Days`} />
                        <Card navigate='/(create-trip)/person' icon='🧳' heading='Who is Travelling' description={person as string || ""} />
                        <Card navigate='/(create-trip)/budget' icon='💰' heading='Budget' description={budget as string || ""} />
                    </View>
                </View>
                <View className='mt-5'>
                    <TouchableOpacity className='rounded-full w-full h-14 bg-black flex items-center justify-center mt-4' onPress={handleGenerateTrip}>
                        <Text style={{ fontSize: getFontSize(16) }} className='text-white font-normal'>Generate Trip</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </Container>
    )
}

export default Review

type CardProps = {
    heading: string,
    description: string,
    icon: string,
    navigate: string
}


const Card = ({ heading, description, icon, navigate }: CardProps) => {
    const router = useRouter()
    return (
        <TouchableOpacity
            onPress={() => router.push(navigate)}
            className={`mt-4 w-full rounded-xl bg-gray-200 p-2 shadow-md `}
        >
            <View className='flex flex-row items-center gap-x-4'>
                <Text style={{ fontSize: getFontSize(36) }}>{icon}</Text>
                <View className='flex flex-col'>
                    <Text style={{ fontSize: getFontSize(16) }} className='font-medium text-gray-500'>{insertLineBreaks(heading, 25)}</Text>
                    <Text style={{ fontSize: getFontSize(20) }} className='font-semibold'>{insertLineBreaks(description, 25)}</Text>
                </View>

            </View>
        </TouchableOpacity>
    )
}