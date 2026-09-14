import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, Redirect } from 'expo-router';
import { useAuthStore } from '../src/store/useAuthStore';

export default function App() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);

  // 1. Selama masih proses cek status login, tampilkan loading
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // 2. Kalau user sudah login, langsung lempar ke Home
  if (user) {
    return <Redirect href="/home" />;
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F5F5F5', '#D9F9DF', '#AEE2FF', '#9FA1FF']}
        locations={[0.75, 0.90, 0.95, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradientContainer}
      >
        <View style={styles.mainWrapper}>
          <Image source={require('../assets/images/man-with-money.png')} style={styles.image} />
          <Text style={styles.greeting}>All your finances in one app</Text>
          <Text style={styles.desc}>Manage your finances in our app.{'\n'}
            We do everything to keep your money safe.</Text>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.buttonLogin} onPress={() => router.push('/login')}>
              <Text style={styles.buttonText}>Log In</Text>
            </Pressable>
            <Pressable style={styles.buttonRegister} onPress={() => router.push('/register')}>
              <Text style={styles.buttonText}>Register</Text>
            </Pressable>
          </View>


          <StatusBar style="auto" />
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
    loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'flex-start',
    fontFamily: 'Inter_400Regular',
  },
  mainWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  image: {
    width: '100%',
    height: 340,
    display: 'flex',
    justifyContent: 'center',
    marginTop: 70
  },
  greeting: {
    width: '100%',
    fontSize: 32,
    marginTop: 20,
    fontFamily: 'Inter_600SemiBold',
  },
  desc: {
    width: '100%',
    fontSize: 16,
    marginTop: 10,
    fontFamily: 'Inter_400Regular',
    opacity: 0.5,
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonLogin: {
    backgroundColor: '#000000',
    padding: 10,
    width: 139.2,
    height: 52.2,
    borderRadius: 15,
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRegister: {
    backgroundColor: '#0044FF',
    padding: 10,
    width: 139.2,
    height: 52.2,
    borderRadius: 15,
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  gradientContainer: {
    width: '100%',
    flex: 1,
    marginTop: 20,
    paddingTop: 20,
  },
});
