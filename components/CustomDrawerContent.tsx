import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { AntDesign, Fontisto } from '@expo/vector-icons'
import useAuthContext from '~/context/AuthContext'
import { useRouter } from 'expo-router'
import getFontSize from '~/functions/fontSizeResponsive'

const CustomDrawerContent = (props: any) => {
    const { top, bottom } = useSafeAreaInsets()
    const router = useRouter()
    const { logout, user } = useAuthContext()

    const handleLogout = () => {
        logout();
        router.replace("/")
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

            <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: bottom }}>
                <TouchableOpacity className='w-full h-14 bg-black mt-4 flex items-center justify-center' onPress={handleLogout}>
                    <Text style={{ fontSize: getFontSize(16) }} className='text-white font-normal'>Logout</Text>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    )
}

export default CustomDrawerContent
