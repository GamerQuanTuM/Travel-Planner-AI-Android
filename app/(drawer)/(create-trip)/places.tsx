import React from 'react';
import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import { Container } from '~/components/Container';
import { useRouter } from 'expo-router';
import useTripContext from '~/context/TripContext';
import PlaceSelector from '~/components/PlaceSelectror';
import OriginSelector from '~/components/OriginSelector';
import getFontSize from '~/functions/fontSizeResponsive';

const Places = () => {
    const router = useRouter();
    const { place, boarding } = useTripContext();

    const handlePress = () => {
        if (!boarding || !place) {
            ToastAndroid.show('Please select travel destination and origin.', ToastAndroid.SHORT);
        } else {
            router.push("/(create-trip)/person");
        }
    };

    return (
        <Container navigate='/(create-trip)'>
            <View className='w-[95%] mx-auto relative h-full'>
                <View className='mb-20'>
                    <Text style={{ fontSize: getFontSize(30) }} className='font-bold'>Destination & Travel Origin</Text>
                </View>
                <View className='flex flex-col gap-y-10'>
                    <PlaceSelector />
                    <OriginSelector />
                </View>

                <View className='absolute bottom-0 self-center mb-32 w-full'>
                    <TouchableOpacity className='rounded-full w-full h-14 bg-black flex items-center justify-center mt-4' onPress={handlePress}>
                        <Text style={{ fontSize: getFontSize(16) }} className='text-white font-normal'>Create Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Container>
    );
};

export default Places;
