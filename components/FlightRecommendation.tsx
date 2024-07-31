import { View, Text, Image } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Trip } from '~/typings/trip'
import getFontSize from '~/functions/fontSizeResponsive'

const FlightRecommendation = ({ trip }: { trip: Trip }) => {
    return (
        <View className='mb-5'>
            <Text style={{ fontSize: getFontSize(24) }} className='font-bold mt-8 mx-6'>Flight Recommendation</Text>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginHorizontal: 10, marginVertical: 20 }}
            >
                {trip?.flight?.flightOptions.map((flight, i) => (
                    <View key={i} className='w-fit mx-3 h-fit pb-2 bg-white rounded-xl mb-[20px]'
                        style={{
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.3,
                            shadowRadius: 6,
                            elevation: 5,
                        }}
                    >
                        <Image source={require("~/assets/plane.jpeg")} className='h-40 object-contain w-full rounded-t-xl' />

                        <View className='pt-2 pb-3 space-y-1 rounded-b-xl px-3'>
                            <Text style={{ fontSize: getFontSize(20) }} className='font-medium px-1'>{flight?.airline}</Text>
                            <Text style={{ fontSize: getFontSize(16) }} className='text-gray-500 px-1'>🛫 {flight?.departureAirport}</Text>
                            <Text style={{ fontSize: getFontSize(16) }} className='text-gray-500 px-1'>🛬 {flight?.arrivalAirport}</Text>
                            <Text style={{ fontSize: getFontSize(16) }} className='text-gray-500 px-1'>💰 ${flight?.price}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

export default FlightRecommendation