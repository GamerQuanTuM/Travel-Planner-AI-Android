import { View, Text, Image } from 'react-native'
import React from 'react'
import { Trip } from '~/typings/trip'
import { ScrollView } from 'react-native-gesture-handler'
import insertLineBreaks from '~/functions/insertLineBreaks'


const HotelRecommendation = ({ trip }: { trip: Trip }) => {
    return (
        <View className='mb-5'>
            <Text className='text-2xl font-bold mx-6'>Hotel Recommendation</Text>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginHorizontal: 10, marginVertical: 20 }}
            >
                {trip?.hotels?.map((hotel, i) => (
                    <View key={i} className='w-fit mx-3 h-fit pb-2 bg-white rounded-xl mb-[20px]'
                        style={{
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 1 }, // Shadow offset
                            shadowOpacity: 0.3,
                            shadowRadius: 6,
                            elevation: 5,
                        }}
                    >
                        {hotel?.hotelImageUrl
                            ?
                            <Image source={{
                                uri: hotel?.hotelImageUrl as string
                            }} className='h-52 object-contain w-full rounded-t-xl' />
                            :
                            <Image source={require('~/assets/placeholder.jpeg')} className='h-52 object-contain w-full rounded-t-xl' />
                        }

                        <View className='pt-4 flex gap-y-3 rounded-b-xl px-3 pb-3'>
                            <Text className='text-xl font-semibold px-1'>{insertLineBreaks(hotel?.hotelName, 25)}</Text>
                            <Text className='text-sm text-gray-500 font-medium px-1'>🏨 {insertLineBreaks(hotel?.hotelAddress, 40)}</Text>
                            <Text className='text-sm text-gray-500 font-medium px-1'>🍽️ {insertLineBreaks(hotel?.description, 40)}</Text>
                            <View className='text-base text-gray-500 font-medium px-1 flex flex-row justify-between items-center w-fit'>
                                <Text>
                                    ⭐ {hotel?.rating}
                                </Text>
                                <Text>
                                    💰 ${hotel?.price} per night
                                </Text>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

export default HotelRecommendation