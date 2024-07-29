import { View, Text } from 'react-native'
import React from 'react'
import { Slot } from 'expo-router'
import { TripProvider } from '~/context/TripContext'

const CreateTripLayout = () => {
    return (
        <TripProvider>
            <Slot />
        </TripProvider>
    )
}

export default CreateTripLayout