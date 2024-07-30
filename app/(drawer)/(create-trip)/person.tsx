import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
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

    const OPTIONS = {
        Me: {
            icon: '✈️', heading: 'Just Me', subHeading: 'A sole traveler in exploration'
        },
        Couple: {
            icon: '🥂', heading: 'A Couple', subHeading: 'Two travelers in tandem'
        },
        Friends: {
            icon: '🏡', heading: 'Family', subHeading: 'A group of fun loving adventure'
        },
        Family: {
            icon: '⛵', heading: 'Friends', subHeading: 'A bunch of thrill-seekers'
        }
    }

    const handlePress = () => {
        if (!active) {
            setError('Please select an option before continuing.')
            ToastAndroid.show('Please select an option before continuing.', ToastAndroid.SHORT);
        } else {
            setPerson(active as PersonType)
            router.push("/(create-trip)/calendar")
        }
    }

    return (
        <Container navigate='/(create-trip)/places'>
            <View className='w-[95%] mx-auto'>
                <View>
                    <Text className='font-bold text-3xl'>Who's Travelling</Text>
                </View>
                <View className='mt-5'>
                    <Text className='font-bold text-xl'>Choose your travellers</Text>
                </View>

                {Object.keys(OPTIONS).map((key) => {
                    const option = OPTIONS[key as keyof typeof OPTIONS];
                    const isActive = active === key;

                    return (
                        <TouchableOpacity
                            key={key}
                            onPress={() => { setActive(key as Active); setError(null); }}
                            className={`mt-4 w-full rounded-xl bg-gray-200 p-5 shadow-md ${isActive ? "border-2 border-gray-600" : ""}`}
                        >
                            <View className='flex flex-row items-center justify-between'>
                                <View className='flex flex-col'>
                                    <Text className='font-semibold text-xl'>{option.heading}</Text>
                                    <Text className='font-medium text-base text-gray-500'>{option.subHeading}</Text>
                                </View>
                                <Text className='text-4xl'>{option.icon}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}

                <TouchableOpacity
                    className='rounded-full w-full h-14 bg-black flex items-center justify-center mt-8'
                    onPress={handlePress}
                >
                    <Text className='text-white font-normal text-base'>Continue</Text>
                </TouchableOpacity>
            </View>
        </Container>
    )
}

export default Person
