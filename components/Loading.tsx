import { View, Image } from 'react-native'
import React, { useRef } from 'react'
import LottieView from 'lottie-react-native';

const Loading = () => {
    const animation = useRef<LottieView>(null);
    return (
        <View className='h-screen w-screen flex justify-center items-center bg-white'>
            <LottieView
                autoPlay
                ref={animation}
                style={{
                    width: 100,
                    height: 100,
                    backgroundColor: '#fff',
                }}
                source={require('~/assets/loading.json')}
            />
            <View className='absolute bottom-5 self-center mb-5'>
                <Image source={require("~/assets/travel-ai-extended.png")} className="h-14 w-40" />
            </View>
        </View>
    )
}

export default Loading
