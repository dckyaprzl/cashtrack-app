import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Welcome Back,</Text>
      <Text style={styles.name}>Dicky Aprizal!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  greeting: {
    fontSize: 16,
    fontWeight: '200',
    marginTop: 50,
    marginLeft: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 0,
    marginLeft: 20,
  },
});
