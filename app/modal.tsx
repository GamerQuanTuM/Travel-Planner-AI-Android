import React, { useEffect, useState } from "react";
import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from "expo-router";

import axiosInstance from "~/lib/axiosInstance";
import useAuthContext from "~/context/AuthContext";
import Loading from "~/components/LoadingTrip";
import NoTrip from "~/components/NoTrip";
import { Itinerary } from "~/typings/itinerary";

export default function Modal() {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (user?.id) {
      axiosInstance.get(`/get-itinerary-by-userId/${user?.id}`)
        .then((res) => {
          setItineraries(res.data.message);
        })
        .catch((err: any) => {
          console.error(err?.response);
          setLoading(false)
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) return <Loading />;

  if (itineraries.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <View className="p-4 bg-white rounded-lg shadow-lg space-y-5">
          <NoTrip />
          <Text className='text-base text-gray-500 text-center mx-5 font-medium'>
            It looks like you haven't planned any itineraries yet. Please add a new itinerary to get started!
          </Text>
        </View>
      </View>

    );
  }

  return (
    <>
      <Text className='font-bold text-3xl mx-[20px] mt-[70px]'>My Trips</Text>

      <View className="mt-5 mx-[20px] space-y-1">
        <Image
          source={{ uri: itineraries[itineraries.length - 1]?.cover }}
          alt="cover.png"
          className="w-full h-40 rounded-xl"
        />

        <View>
          <Text className="text-xl font-semibold">{itineraries[itineraries.length - 1]?.destination}</Text>
        </View>
        <View className="flex flex-row justify-between items-center">
          <Text className="text-base text-gray-400 font-semibold">{itineraries[itineraries.length - 1]?.duration} Days</Text>
          <Text className="text-base text-gray-400 font-semibold">
            🌉 {itineraries[itineraries.length - 1]?.travelType?.charAt(0).toUpperCase() + itineraries[itineraries.length - 1]?.travelType?.slice(1).toLowerCase()}
          </Text>
        </View>

        <FlatList
          data={itineraries}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push(`/(drawer)/(create-trip)/trip/${item?.id}`)}
              className="flex flex-row my-2 gap-x-1 mt-4 flex-1"
            >
              <View className="w-[30%]">
                <Image
                  source={{ uri: item?.cover }}
                  alt="cover.png"
                  className="w-full h-20 rounded-xl"
                />
              </View>
              <View className="flex-1 px-2 gap-y-1">
                <Text className="text-xl font-semibold">{item.destination}</Text>
                <Text className="text-sm text-gray-400 font-semibold">{item.duration} Days</Text>
                <Text className="text-sm text-gray-400 font-semibold">
                  Travelling {item.travelType?.charAt(0).toUpperCase() + item.travelType?.slice(1).toLowerCase()}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </>
  );
}
