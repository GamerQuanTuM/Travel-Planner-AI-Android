import { ScrollView, Text, BackHandler, Image, View, LayoutChangeEvent } from 'react-native'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { Container } from '~/components/Container'
import { Redirect, useLocalSearchParams, useNavigation, useRouter, } from 'expo-router';
import axiosInstance from '~/lib/axiosInstance';
import LoadingTrip from '~/components/LoadingTrip';
import { Trip as TripType } from '~/typings/trip';
import { Itinerary } from '~/typings/itinerary';
import FlightRecommendation from '~/components/FlightRecommendation';
import HotelRecommendation from '~/components/HotelRecommendation';

type TravelDetailsWithoutTrip = Omit<Itinerary, "trip">

const Trip = () => {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [trip, setTrip] = useState<TripType | null>(null)
    const [cover, setCover] = useState<string | null>(null)
    const [travelDetails, setTravelDetails] = useState<TravelDetailsWithoutTrip | null>(null)

    const [contentHeight, setContentHeight] = useState(0);
    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => {
                router.dismissAll();
                return true;
            }
        );
        return () => backHandler.remove();
    }, [navigation]);

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                setLoading(true);
                const { data } = await axiosInstance.post("/get-individual-itinerary", {
                    id
                });
                setLoading(false);
                setTrip(data?.message?.trip as TripType)
                setTravelDetails(data?.message)
            } catch (error: any) {
                setLoading(false);
                console.error(error);
            }
        };

        if (id) {
            fetchTrip();
        }
    }, [id]);

    if (loading) return <LoadingTrip />

    const insertLineBreaks = (text: string, maxLength: number) => {
        if (!text) return '';
        const words = text.split(' ');
        let result = '';
        let lineLength = 0;

        for (let i = 0; i < words.length; i++) {
            if (lineLength + words[i].length + 1 > maxLength) {
                result += '\n';
                lineLength = 0;
            }
            result += words[i] + ' ';
            lineLength += words[i].length + 1;
        }
        return result.trim();
    };





    return (
        <ScrollView>
            <Image className='w-full mx-auto h-[300px]' source={{
                uri: travelDetails?.cover as string
            }} />
            <ScrollView className='rounded-t-3xl h-full bg-white -mt-[20px] pb-20'>
                <View className='mt-5 mx-5 space-y-2'>
                    <Text className='text-3xl font-bold'>{travelDetails?.destination}</Text>
                    <Text className='text-lg text-gray-500 font-bold'>🚇&nbsp; {travelDetails?.duration} days</Text>
                    <Text className='text-lg text-gray-500 font-bold'>🧑‍🤝‍🧑&nbsp; {travelDetails && travelDetails?.travelType.charAt(0)?.toUpperCase() + travelDetails?.travelType.slice(1)?.toLowerCase()}</Text>
                </View>

                <FlightRecommendation trip={trip as TripType} />
                <HotelRecommendation trip={trip as TripType} />
            </ScrollView>
        </ScrollView>
    )
}

export default Trip


