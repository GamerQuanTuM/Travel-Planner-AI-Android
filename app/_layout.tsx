import React from 'react';
import { Slot } from 'expo-router';
import { AuthProvider } from '~/context/AuthContext';

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: '(drawer)',
// };

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
