import { View, Text } from 'react-native'
import React from 'react'
import { Container } from '~/components/Container'

const Review = () => {
    return (
        <Container navigate='/(create-trip)/budget'>
            <View className='w-[95%] mx-auto'>
                <View>
                    <Text className='font-bold text-3xl'>Review Your Trip</Text>
                </View>
                <View className='mt-5'>
                    <Text className='font-bold text-xl'>Before generating your trip, please review your selection</Text>
                </View>
            </View>
        </Container>
    )
}

export default Review