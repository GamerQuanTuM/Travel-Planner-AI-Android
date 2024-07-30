import { View, Text, Image } from 'react-native'
import React from 'react'
import { Trip } from '~/typings/trip'
import { ScrollView } from 'react-native-gesture-handler'
import insertLineBreaks from '~/functions/insertLineBreaks'

const DayWisePlan = ({ trip }: { trip: Trip }) => {
    return (
        <View className='mb-4'>
            <Text className='text-2xl font-bold mt-8 mx-6'>Plan Details</Text>

            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                {trip?.dailyPlan.map((plan, i) => (
                    <View key={i} className='mx-6 my-[20px]'>
                        <Text className='text-xl font-medium text-red-500'>Day {plan?.day}</Text>
                        <View>{plan?.placesToVisit.map((place, j) =>
                        (
                            <View key={j} className='my-5 h-fit pb-2 bg-white rounded-xl mb-[20px]'
                                style={{
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 1 },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 6,
                                    elevation: 5,
                                }}>
                                {place?.placesImageUrl ? (
                                    <Image
                                        source={{ uri: place.placesImageUrl }}
                                        className="h-52 w-full rounded-t-xl object-contain"
                                    />
                                ) : (
                                    <Image
                                        source={require('~/assets/placeholder.jpeg')}
                                        className="h-52 w-full rounded-t-xl object-contain"
                                    />
                                )}



                                <View className='pt-3 pb-3 space-y-2 rounded-b-xl px-3'>
                                    <Text className='text-xl font-medium px-1'>{place?.placeName}</Text>
                                    <Text className='text-sm text-gray-500 font-medium px-1'>{insertLineBreaks(place?.description, 40)}</Text>
                                    <Text className='text-base text-gray-600 font-medium px-1'>🎟️&nbsp; Ticket Price &nbsp;
                                        <Text className='text-black font-semibold'>
                                            {(place?.price === "Free") ? `${place.price}` : `$${place.price}`}

                                        </Text>
                                    </Text>

                                    <Text className='text-base text-gray-600 font-medium px-1'>🕙&nbsp; Time To Spend &nbsp;
                                        <Text className='text-black font-semibold'>
                                            {place?.timeToSpend}
                                        </Text>
                                    </Text>
                                </View>
                            </View>
                        )
                        )}</View>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

export default DayWisePlan