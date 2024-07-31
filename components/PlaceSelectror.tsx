import React from 'react';
import { Text, FlatList } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import useTripContext from '~/context/TripContext';
import getFontSize from '~/functions/fontSizeResponsive';

const PlaceSelector = () => {
    const { setPlace } = useTripContext();

       const styles = {
        container: {
            flex: 1,
            padding: 10,
        },
        textInputContainer: {
            flexDirection: 'row',
            backgroundColor: '#FFFFFF',
            borderRadius: 10,
            padding: 5,
            marginVertical: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        textInput: {
            backgroundColor: '#FFFFFF',
            height: 44,
            borderRadius: 5,
            paddingVertical: 10,
            paddingHorizontal: 20,
            fontSize: getFontSize(16),
            flex: 1,
            color: '#333',
        },
        poweredContainer: {
            justifyContent: 'flex-end',
            alignItems: 'center',
            borderBottomRightRadius: 5,
            borderBottomLeftRadius: 5,
            borderColor: '#c8c7cc',
            borderTopWidth: 0.5,
        },
        powered: {},
        listView: {
            backgroundColor: '#FFFFFF',
            borderRadius: 10,
            elevation: 5,
            shadowColor: '#fff',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
        },
        row: {
            backgroundColor: '#FFFFFF',
            padding: 13,
            height: 44,
            flexDirection: 'row',
            alignItems: 'center',
        },
        separator: {
            height: 0.5,
            backgroundColor: '#c8c7cc',
        },
        description: {
            fontSize: getFontSize(15),
            color: '#333',
        },
        loader: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            height: 20,
        },
    }

    return (
        <FlatList
            data={[{ key: '1' }]}
            renderItem={() => (
                <>
                    <Text style={{ fontSize: getFontSize(24) }} className='font-bold'>Choose your travel destination</Text>
                    <GooglePlacesAutocomplete
                        placeholder='Search destination'
                        styles={styles}
                        onPress={(data, details = null) => {
                            setPlace(data.description);
                        }}
                        query={{
                            key: process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY,
                            language: 'en',
                            types: '(cities)',
                        }}
                        debounce={200}
                    />
                </>
            )}
            keyExtractor={item => item.key}
        />
    );
};

export default PlaceSelector;
