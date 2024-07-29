import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Container } from '~/components/Container'
import useTripContext, { Budget as BudgetType } from '~/context/TripContext'

enum Active {
    CHEAP = "Cheap",
    LUXURY = "Luxury",
    MODERATE = "Moderate",
}

const Budget = () => {
    const router = useRouter()
    const [active, setActive] = useState<Active | null>(null)
    const [error, setError] = useState<string | null>(null)

    const { setPerson,setBudget } = useTripContext()

    const OPTIONS = {
        Cheap: {
           icon:'💵', heading:'Cheap', subHeading:'Stay conscious of costs'
        },
        Modearte: {
          icon:'💰', heading:'Moderate', subHeading:'Keep cost on the average side'
        },
        Luxury: {
            icon:'💸', heading:'Luxury', subHeading:'Dont worry about cost' 
        }
    }

    const handlePress = () => {
        if (!active) {
            setError('Please select an option before continuing.')
            ToastAndroid.show('Please select an option before continuing.', ToastAndroid.SHORT);
        } else {
            setBudget(active as BudgetType)
            router.push("/(create-trip)/review")
        }
    }

    return (
        <Container navigate='/(create-trip)/calendar'>
            <View className='w-[95%] mx-auto'>
                <View>
                    <Text className='font-bold text-3xl'>Budget</Text>
                </View>
                <View className='mt-5'>
                    <Text className='font-bold text-xl'>Choose spending habits for your trip</Text>
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

export default Budget
