import React from 'react'
import { View, Text, TouchableOpacity, TextInput, ToastAndroid } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Container } from '~/components/Container';
import { useRouter } from 'expo-router';
import useTripContext from '~/context/TripContext';

const Places = () => {
    const router = useRouter()
    const { setPlace, setBoarding, place, boarding } = useTripContext()

    const handlePress = () => {
        if (!boarding || !place) {
            ToastAndroid.show('Please select travel of destination and origin.', ToastAndroid.SHORT);
        } else {
            router.push("/(create-trip)/person")
        }
    }


    return (
        <Container navigate='/(create-trip)'>
            <View className='w-[95%] mx-auto relative h-full'>
                <View className='flex flex-col gap-y-10'>
                    <View className='gap-y-3'>
                        <Text className='font-bold text-2xl'>Choose your travel of destination</Text>
                        <GooglePlacesAutocomplete
                            placeholder='Search'
                            
                            styles={{
                                textInputContainer: {
                                    backgroundColor: 'grey',
                                    borderColor: "black",
                                    height: 20,
                                    width: "100%"
                                },
                                textInput: {
                                    height: 38,
                                    color: '#5d5d5d',
                                    fontSize: 16,
                                },
                                predefinedPlacesDescription: {
                                    color: '#1faadb',
                                },
                            }}
                            onPress={(data, details) => {
                                console.log(data, details);
                            }}
                            query={{
                                key: process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY,
                                language: 'en',
                            }}
                        />

                        {/* <TextInput onChangeText={(place) => setPlace(place as string)} textContentType='emailAddress' className='border w-full h-12 rounded-xl px-5 text-xl' /> */}
                    </View>
                    <View className='gap-y-3'>
                        <Text className='font-bold text-2xl'>Choose your travel of origin</Text>
                        <GooglePlacesAutocomplete
                            placeholder='Search'
                            onPress={(data, details = null) => {
                                console.log(data, details);
                            }}
                            query={{
                                key: process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY,
                                language: 'en',
                            }}
                        />
{/* 
                        <TextInput onChangeText={(place) => setBoarding(place as string)} textContentType='emailAddress' className='border w-full h-12 rounded-xl px-5 text-xl' /> */}
                    </View>
                </View>

                <View className='absolute bottom-0 self-center mb-32 w-full'>
                    <TouchableOpacity className='rounded-full w-full h-14 bg-black flex items-center justify-center mt-4' onPress={handlePress}>
                        <Text className='text-white font-normal text-base'>Create Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Container>
    )
}

export default Places