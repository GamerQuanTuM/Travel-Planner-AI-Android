import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import useAuthContext from '~/context/AuthContext';

export default function Home() {
  const { logout } = useAuthContext()
  return (
    <>
      <Stack.Screen options={{ title: 'Tab One' }} />
      <View style={styles.container}>
        <Link href="/" asChild>
          <TouchableOpacity className='rounded-full w-full h-14 bg-white border-[1px] border-gray-300 flex items-center justify-center mt-4' onPress={() => logout()}>
            <Text className='text-black font-normal text-base'>Logout</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
