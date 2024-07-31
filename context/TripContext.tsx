import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { useRouter } from "expo-router";
import { isAxiosError } from "axios";

import axiosInstance from "~/lib/axiosInstance";
import useAuthContext from "./AuthContext";
import LoadingTrip from "~/components/LoadingTrip";
import { ToastAndroid } from "react-native";


export type Person = "Me" | "Couple" | "Family" | "Friends" | undefined
export type Budget = "Cheap" | "Moderate" | "Luxury" | undefined

interface TripContextType {
    setDuration: Dispatch<SetStateAction<string>>
    setBudget: Dispatch<SetStateAction<Budget>>
    setPerson: Dispatch<SetStateAction<Person>>
    setPlace: Dispatch<SetStateAction<string | undefined>>
    setBoarding: Dispatch<SetStateAction<string | undefined>>
    handleGenerateTrip: () => Promise<void>
    loading: boolean,
    place: string | undefined;
    boarding: string | undefined,
    person: Person,
    budget: Budget,
    duration: string,

}

// Create the context with an initial value
const TripContext = createContext<TripContextType | undefined>(undefined);
export const TripProvider = ({ children }: { children: ReactNode }) => {
    const [budget, setBudget] = useState<Budget>(undefined)
    const [person, setPerson] = useState<Person>(undefined)
    const [place, setPlace] = useState<string | undefined>(undefined)
    const [boarding, setBoarding] = useState<string | undefined>(undefined)
    const [duration, setDuration] = useState<string>("0")
    const [loading, setLoading] = useState(false);
    const { user } = useAuthContext()
    const router = useRouter()

    const handleGenerateTrip = async () => {
        try {
            setLoading(true)
            const res = await axiosInstance.post("/gemini", {
                email: user?.email,
                budget,
                person,
                place,
                boarding,
                duration: parseInt(duration)
            })
            const trip = res.data.message
            setLoading(false)
            if (trip) {
                router.push(`/(create-trip)/trip/${trip?.id}`)
            }

        } catch (error: any) {
            setLoading(false)
            console.error('Error generating trip:', error);
            if (isAxiosError(error) && error.response?.data) {
                ToastAndroid.show(error.response?.data?.message, ToastAndroid.SHORT);
            } else {
                ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
            }
            router.replace("/(drawer)")
        }
    }

    if (loading) {
        return <LoadingTrip />
    }




    return (
        <TripContext.Provider value={{ setBoarding, setBudget, setDuration, setPerson, setPlace, handleGenerateTrip, loading, boarding, budget, duration, person, place }}>
            {children}
        </TripContext.Provider>
    );
};

const useTripContext = () => {
    const context = useContext(TripContext);
    if (!context) {
        throw new Error("useTripContext must be used within an TripProvider");
    }
    return context;
};

export default useTripContext;

