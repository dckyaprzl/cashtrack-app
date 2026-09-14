import { useFonts, Inter_200ExtraLight, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { Stack } from "expo-router";
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../src/services/firebase';
import { useAuthStore } from '../src/store/useAuthStore';

export default function RootLayout() {
  const setUser = useAuthStore((state) => state.setUser);
  const setIsLoading = useAuthStore((state) => state.setIsLoading);
  const [fontsLoaded] = useFonts({
    Inter_200ExtraLight,
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser); // firebaseUser berisi data user kalau login, atau null kalau tidak
      setIsLoading(false); // pengecekan selesai, matikan loading
    });

    return () => unsubscribe(); // cleanup listener saat component unmount
  }, []);

  if (!fontsLoaded) {
    return null; // atau tampilkan loading screen
  }
  return (<Stack 
        screenOptions={{
          headerShown: false,
        }}
  />
  );
}
