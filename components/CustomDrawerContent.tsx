import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { useRouter } from 'expo-router'

import { AntDesign, Fontisto, MaterialIcons } from '@expo/vector-icons'
import useAuthContext from '~/context/AuthContext'
import getFontSize from '~/functions/fontSizeResponsive'

const CustomDrawerContent = (props: any) => {
    const { top, bottom } = useSafeAreaInsets()
    const router = useRouter()
    const { logout, user } = useAuthContext()

    const handleLogout = () => {
        logout();
        router.replace("/")
    }

    const handleUpgradePlan = () =>{
        router.push("/(upgrade-plan)")
    }
    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: top + 50, flex: 1, backgroundColor: '#f0f0f0' }}>
            <DrawerItemList {...props} />

            <View className='space-y-4 w-full'>
                <View className='flex flex-row gap-x-2 items-center h-14 w-full px-3'>
                    <AntDesign name="profile" size={28} color="black" />
                    <View className='px-2 flex-shrink-1'>
                        <Text style={{ fontSize: getFontSize(18) }} className='font-semibold'
                        // numberOfLines={1} ellipsizeMode='middle'
                        >{user && user?.name?.length > 15 ? `${user?.name?.substring(0, 15)}...` : user?.name}</Text>
                    </View>
                </View>
                <View className='flex flex-row gap-x-2 items-center h-14 w-full px-3'>
                    <Fontisto name="email" size={28} color="black" />
                    <View className='px-2 flex-shrink-1'>
                        <Text style={{ fontSize: getFontSize(18) }} className='font-semibold'
                        >{user && user?.email?.length > 15 ? `${user?.email?.substring(0, 15)}...` : user?.email}</Text>
                    </View>
                </View>
            </View>

            <View className='flex-1 justify-end'>
                <TouchableOpacity  onPress={handleUpgradePlan} className='w-full h-14 bg-white flex flex-row items-center justify-center space-x-4'>
                    <AntDesign name="pluscircleo" size={24} color="black" />
                    <Text style={{ fontSize: getFontSize(18) }} className='text-black font-normal'>Upgrade Plan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingBottom: bottom }} className='w-full h-14 bg-black  flex flex-row items-center justify-center space-x-4' onPress={handleLogout}>
                    <MaterialIcons name="logout" size={24} color="white" />
                    <Text style={{ fontSize: getFontSize(18) }} className='text-white font-normal'>Logout</Text>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    )
}

export default CustomDrawerContent
