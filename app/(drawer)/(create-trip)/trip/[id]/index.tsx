import React, { useEffect, useState } from 'react'
import { ScrollView, Text, BackHandler, Image, View, ToastAndroid } from 'react-native'
import { useLocalSearchParams, useNavigation, useRouter, } from 'expo-router';
import axiosInstance from '~/lib/axiosInstance';
import LoadingTrip from '~/components/LoadingTrip';
import { Trip as TripType } from '~/typings/trip';
import { Itinerary } from '~/typings/itinerary';
import FlightRecommendation from '~/components/FlightRecommendation';
import HotelRecommendation from '~/components/HotelRecommendation';
import DayWisePlan from '~/components/DayWisePlan';
import { isAxiosError } from 'axios';
import getFontSize from '~/functions/fontSizeResponsive';

type TravelDetailsWithoutTrip = Omit<Itinerary, "trip">

const Trip = () => {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [trip, setTrip] = useState<TripType | null>(null)
    const [travelDetails, setTravelDetails] = useState<TravelDetailsWithoutTrip | null>(null)

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
                setTravelDetails(data?.message as TravelDetailsWithoutTrip)
            } catch (error: any) {
                setLoading(false);
                console.error(error);
                console.error('Error generating trip:', error);
                if (isAxiosError(error) && error.response?.data) {
                    ToastAndroid.show(error.response?.data?.message, ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
                }
                router.replace("/(drawer)")
            }
        };

        if (id) {
            fetchTrip();
        }
    }, [id]);

    if (loading) return <LoadingTrip />
    return (
        <ScrollView>
            <Image className='w-full mx-auto h-[400px]' source={{
                uri: travelDetails?.cover as string
            }} />
            <ScrollView className='rounded-t-3xl h-full bg-white -mt-[20px]'>
                <View className='mt-5 mx-5 space-y-2'>
                    <Text style={{ fontSize: getFontSize(30) }} className='font-bold'>{travelDetails?.destination}</Text>
                    <Text style={{ fontSize: getFontSize(18) }} className='text-gray-500 font-bold'>🚇&nbsp; {travelDetails?.duration} days</Text>
                    <Text style={{ fontSize: getFontSize(18) }} className='text-gray-500 font-bold'>🧑‍🤝‍🧑&nbsp; {travelDetails && travelDetails?.travelType.charAt(0)?.toUpperCase() + travelDetails?.travelType.slice(1)?.toLowerCase()}</Text>
                </View>

                <FlightRecommendation trip={trip as TripType} />
                <HotelRecommendation trip={trip as TripType} />
                <DayWisePlan trip={trip as TripType} />
            </ScrollView>
        </ScrollView>
    )
}

export default Trip


