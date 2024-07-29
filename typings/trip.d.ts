export interface TripDetails {
    destination: string;
    duration: string;
    budget: string;
    travelers: string;
}

export interface FlightOption {
    airline: string;
    flightNumber: string;
    departureAirport: string;
    arrivalAirport: string;
    price: number;
    bookingUrl: string;
}

export interface Flight {
    flightOptions: FlightOption[];
}

export interface PlaceNearby {
    placeName: string;
    placeDetails: string;
    geoCoordinates: string;
    ticketPricing: string;
    timeToTravel: string | number;
    placeImageUrl?: string | null;
}

export interface Hotel {
    hotelName: string;
    hotelAddress: string;
    price: number;
    geoCoordinates: string;
    rating: number;
    description: string;
    placesNearby: PlaceNearby[];
    hotelImageUrl?: string | null;
}



export interface DailyPlan {
    day: string
    placesToVisit: PlacesToVisit[]
}


export interface Trip {
    trip_details: TripDetails;
    flight: Flight;
    hotels: Hotel[];
    dailyPlan: DailyPlan[];
}

export interface PlacesToVisit {
    placeName: string;
    description: string;
    timeToSpend: string;
    price: string;
    geoCoordinates:string;
    placesImageUrl?: string;
}


export interface Trip {
    trip_details: TripDetails;
    flight: Flight;
    hotels: Hotel[];
    dailyPlan: DailyPlan[];
}
