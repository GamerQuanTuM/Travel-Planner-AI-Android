import { View, Image } from 'react-native'
import React, { useRef } from 'react'
import LottieView from 'lottie-react-native';

const NoTrip = () => {
    const animation = useRef<LottieView>(null);
    return (
        <View className='w-screen flex justify-center items-center bg-white'>
            <LottieView
                autoPlay
                ref={animation}
                style={{
                    width: 100,
                    height: 100,
                    backgroundColor: '#fff',
                }}
                source={require('~/assets/no-trip.json')}
            />
        </View>
    )
}

export default NoTrip
