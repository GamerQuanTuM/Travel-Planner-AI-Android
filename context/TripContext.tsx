import React from "react"
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import axiosInstance from "~/lib/axiosInstance";
import useAuthContext from "./AuthContext";
import { Trip } from "~/typings/trip";


export type Person = "Me" | "Couple" | "Family" | "Friends" | undefined
export type Budget = "Cheap" | "Moderate" | "Luxury" | undefined

interface TripContextType {
    setDuration: Dispatch<SetStateAction<string>>
    setBudget: Dispatch<SetStateAction<Budget>>
    setPerson: Dispatch<SetStateAction<Person>>
    setPlace: Dispatch<SetStateAction<string | undefined>>
    setBoarding: Dispatch<SetStateAction<string | undefined>>
    handleGenerateTrip: () => Promise<Trip | undefined>
    loading: boolean
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

    console.log(budget)

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
            if (!trip || !trip.message || !trip.message.id) {
                console.log('Invalid trip data received from API');
            }
            setLoading(false)
            return trip as Trip
        } catch (error) {
            setLoading(false)
            console.error('Error generating trip:', error);
        }
    }


    return (
        <TripContext.Provider value={{ setBoarding, setBudget, setDuration, setPerson, setPlace, handleGenerateTrip, loading }}>
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

