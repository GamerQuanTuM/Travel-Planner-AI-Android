import React from 'react';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import CustomDrawerContent from '~/components/CustomDrawerContent';
import useAuthContext from '~/context/AuthContext';
import Loading from '~/components/Loading';
import { Redirect } from 'expo-router';

export default function Layout() {

  const { user, isLoading } = useAuthContext()
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setInitialLoading(false);
    }
  }, [isLoading]);

  if (initialLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Redirect href="/" />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={CustomDrawerContent}
        screenOptions={{
          headerShown: false,
          drawerHideStatusBarOnOpen: true
          // drawerItemStyle: { display: 'none' }
        }} >
        <Drawer.Screen
          name='(create-trip)'
          options={{
            drawerItemStyle: { display: 'none' }
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
