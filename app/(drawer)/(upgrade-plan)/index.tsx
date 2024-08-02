import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Container } from '~/components/Container';
import getFontSize from '~/functions/fontSizeResponsive';
import useAuthContext from '~/context/AuthContext';
import Loading from '~/components/Loading';

interface Plan {
    plan: string;
    price: number;
    features: string[];
}

const UpgradePlan = () => {
    const { user } = useAuthContext();
    const [selectedPlan, setSelectedPlan] = useState('');
    const [price, setPrice] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user?.subscription) setLoading(true);
        else setLoading(false);
    }, [user?.subscription]);

    if (loading) {
        return <Loading />
    }

    const handlePlanSelect = (plan: string, price: number) => {
        setSelectedPlan(plan);
        setPrice(price);
    };

    const plans = [
        {
            plan: 'Basic',
            price: 100,
            features: ['8 itineraries per month', 'Access to basic travel planning features', 'Email support']
        },
        {
            plan: 'Standard',
            price: 200,
            features: ['10 itineraries per month', 'Access to standard travel planning features', 'Priority email support']
        },
        {
            plan: 'Premium',
            price: 500,
            features: ['15 itineraries per month', 'Access to all travel planning features', '24/7 phone and email support']
        }
    ];

    const getDisabledStatus = (plan: string) => {
        if (user?.subscription === "FREE") {
            return false; // All plans are enabled for FREE subscription
        }

        if (user?.subscription === "BASIC") {
            return plan === 'Basic'; // Only the Basic plan is disabled
        }

        if (user?.subscription === "STANDARD") {
            return plan === 'Basic' || plan === 'Standard'; // Basic and Standard plans are disabled
        }

        if (user?.subscription === "PREMIUM") {
            return true; // All plans are disabled
        }

        return false;
    };

    const isButtonDisabled = () => {
        if (user?.subscription && user?.subscription === "PREMIUM") return true;
        return !selectedPlan;
    };

    const handlePayment = () => {
        // Payment handling logic
    };

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
        >
            <Container navigate='/(create-trip)'>
                <View className='w-[95%] mx-auto'>
                    <View className='mb-5'>
                        <Text style={{ fontSize: getFontSize(30) }} className='font-bold'>Upgrade Plan</Text>
                    </View>
                </View>
                {plans.map((plan, index) => {
                    const isSelected = selectedPlan === plan.plan;
                    return (
                        <TouchableOpacity
                            key={index}
                            className={`mx-3 pb-2 bg-white rounded-xl mb-[20px] ${getDisabledStatus(plan.plan) ? 'opacity-50' : ''}`}
                            style={{
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.3,
                                shadowRadius: 6,
                                elevation: 5,
                                borderColor: isSelected ? 'black' : 'transparent',
                                borderWidth: isSelected ? 1 : 0,
                                width: '90%',
                                alignSelf: 'center',
                            }}
                            onPress={() => !getDisabledStatus(plan.plan) && handlePlanSelect(plan.plan, plan.price)}
                            disabled={getDisabledStatus(plan.plan)}
                        >
                            <View className='pt-2 pb-3 rounded-b-xl px-3'>
                                <Text style={{ fontSize: getFontSize(30) }} className='font-bold px-1 mb-3'>{plan.plan}</Text>
                                <Text style={{ fontSize: getFontSize(24) }} className='text-gray-700 px-1 font-normal mb-3'>₹{plan.price}/month</Text>
                                {plan.features.map((feature, featureIndex) => (
                                    <Text key={featureIndex} style={{ fontSize: getFontSize(20) }} className='text-gray-400 px-1 mb-3'>{feature}</Text>
                                ))}
                            </View>
                        </TouchableOpacity>
                    );
                })}
                <TouchableOpacity className={`rounded-full w-full h-14 bg-black flex items-center justify-center mt-4 ${isButtonDisabled() ? 'opacity-50' : ''}`} disabled={isButtonDisabled()} onPress={handlePayment}>
                    <Text style={{ fontSize: getFontSize(16) }} className='text-white font-normal'>Login</Text>
                </TouchableOpacity>
            </Container>
        </ScrollView>
    );
};

export default UpgradePlan;
