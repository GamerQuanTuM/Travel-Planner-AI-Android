import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Container } from '~/components/Container'
import useTripContext, { Budget as BudgetType } from '~/context/TripContext'
import getFontSize from '~/functions/fontSizeResponsive'

enum Active {
    CHEAP = "Cheap",
    LUXURY = "Luxury",
    MODERATE = "Moderate",
}

const Budget = () => {
    const router = useRouter()
    const [active, setActive] = useState<Active | null>(null)
    const [error, setError] = useState<string | null>(null)

    const { setBudget } = useTripContext()

    const OPTIONS = {
        Cheap: {
           icon:'💵', heading:'Cheap', subHeading:'Stay conscious of costs'
        },
        Moderate: {
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
                    <Text style={{ fontSize: getFontSize(30) }} className='font-bold'>Budget</Text>
                </View>
                <View className='mt-5'>
                    <Text style={{ fontSize: getFontSize(20) }} className='font-bold'>Choose spending habits for your trip</Text>
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
                                    <Text style={{ fontSize: getFontSize(20) }} className='font-semibold'>{option.heading}</Text>
                                    <Text style={{ fontSize: getFontSize(14) }} className='font-medium text-gray-500'>{option.subHeading}</Text>
                                </View>
                                <Text style={{ fontSize: getFontSize(36) }}>{option.icon}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}

                <TouchableOpacity
                    className='rounded-full w-full h-14 bg-black flex items-center justify-center mt-8'
                    onPress={handlePress}
                >
                    <Text style={{ fontSize: getFontSize(16) }} className='text-white font-normal'>Continue</Text>
                </TouchableOpacity>
            </View>
        </Container>
    )
}

export default Budget
