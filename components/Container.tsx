import React from "react"
import { StyleSheet, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export const Container = ({ children, navigate }: { children: React.ReactNode, navigate?: string }) => {
  const router = useRouter()
  return <SafeAreaView style={styles.container}>
    <View style={styles.innerContainer}>
      {navigate && <TouchableOpacity className='mb-5' onPress={() => router.push(`${navigate}`)}>
        <AntDesign name="arrowleft" size={28} color="black" />
      </TouchableOpacity>}
      <View>
        {children}
      </View>
    </View>
  </SafeAreaView >;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  innerContainer: {
    marginTop: 70,
    marginHorizontal: 20
  }
});
