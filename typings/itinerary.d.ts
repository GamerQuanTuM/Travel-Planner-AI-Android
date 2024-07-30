import { Trip } from "./trip"

type Itinerary = {
    id: string,
    createdAt: Date,
    updatedAt: Date,
    cover: string,
    trip: Trip
    destination: string,
    budgetType: string,
    duration: string,
    travelOrigin: string,
    travelType: string,
}