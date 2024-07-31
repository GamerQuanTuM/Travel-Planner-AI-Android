import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import { useRouter } from 'expo-router';

import { Container } from '~/components/Container';
import CalendarPicker from 'react-native-calendar-picker';
import { differenceInDays } from 'date-fns';
import useTripContext from '~/context/TripContext';
import getFontSize from '~/functions/fontSizeResponsive';

const Calendar = () => {
    const { setDuration } = useTripContext();
    const [startDate, setStartDate] = useState<null | Date>(null);
    const [endDate, setEndDate] = useState<null | Date>(null);
    const minDate = new Date(); // Minimum selectable date is today
    const router = useRouter()

    function onDateChange(date: Date, type: string) {
        if (type === 'START_DATE') {
            setStartDate(date);
            // Reset endDate if it's before the new startDate
            if (endDate && date > endDate) {
                setEndDate(null);
            }
        } else {
            setEndDate(date);
        }
    }

    function handleDateChange() {
        if (startDate && endDate) {
            const dateDiff = differenceInDays(new Date(endDate), new Date(startDate));
            if (dateDiff >= 0) {
                setDuration(String(dateDiff + 1));
                router.push("/(create-trip)/budget")
            } else {
                ToastAndroid.show('End date must be after start date.', ToastAndroid.SHORT);
            }
        } else {
            ToastAndroid.show('Please select both start and end dates.', ToastAndroid.SHORT);

        }
    }

    return (
        <Container navigate='/(create-trip)/person'>
            <View className=''>
                <Text style={{ fontSize: getFontSize(30) }} className='font-bold mb-4'>Calendar</Text>
                <View>
                    <CalendarPicker
                        allowBackwardRangeSelect={true}
                        allowRangeSelection={true}
                        minDate={minDate}
                        selectedRangeStyle={{
                            backgroundColor: '#000',
                        }}
                        selectedDayTextStyle={{
                            color: '#fff',
                        }}
                        onDateChange={onDateChange}
                    />
                </View>

                <TouchableOpacity
                    className='rounded-full w-full h-14 bg-black flex items-center justify-center mt-10'
                    onPress={handleDateChange}
                >
                    <Text style={{ fontSize: getFontSize(16) }} className='text-white font-normal'>Continue</Text>
                </TouchableOpacity>
            </View>
        </Container>
    );
};

export default Calendar;
