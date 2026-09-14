import { useState } from 'react';
import { View, Text, KeyboardAvoidingView, TextInput, Pressable, Platform, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import { loginUser } from '../../src/services/authService';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    async function handleLogin() {
        if (!email || !password) {
            setErrorMessage('Please enter both email and password.');
            return;
        }

        setLoading(true);
        setErrorMessage('');

        try {
            await loginUser(email, password);
            router.replace('/home');
        } catch (error) {
            setErrorMessage('Invalid email or password.');
        } finally {
            setLoading(false);
        }
    }
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <LinearGradient
                colors={['#F5F5F5', '#D9F9DF', '#AEE2FF', '#9FA1FF']}
                locations={[0.75, 0.90, 0.95, 1]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.gradientContainer}
            >
                <View style={styles.mainWrapper}>

                    <View style={styles.titleWrapper}>
                        <Text style={styles.title}>Welcome Back!</Text>
                        <Text style={styles.desc}>Login to manage your finances</Text>
                    </View>

                    <View style={styles.form}>
                        <Text style={styles.label}>Email</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="mail-outline" size={20} color="#999" style={styles.icon} />

                            <TextInput
                                style={styles.input}
                                placeholder="you@example.com"
                                placeholderTextColor="#999"
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                keyboardType="email-address"
                            />
                        </View>
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="lock-closed" size={20} color="#999" style={styles.icon} />

                            <TextInput
                                style={styles.input}
                                placeholder="••••••••"
                                placeholderTextColor="#999"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>
                        {errorMessage ? (
                            <Text style={styles.errorText}>{errorMessage}</Text>
                        ) : null}

                        <Pressable
                            style={styles.buttonLogin}
                            onPress={handleLogin}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.buttonText}>Login</Text>
                            )}
                        </Pressable>

                        <Pressable onPress={() => router.push('/(auth)/register')}>
                            <Text style={styles.registerLink}>
                                Don't have an account? <Text style={styles.registerLinkBold}>Register</Text>
                            </Text>
                        </Pressable>
                    </View>

                </View>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
}

// Terjemahkan Firebase error code jadi pesan yang lebih ramah user
function getErrorMessage(errorCode: string): string {
    switch (errorCode) {
        case 'auth/invalid-email':
            return 'Format email tidak valid';
        case 'auth/user-not-found':
        case 'auth/invalid-credential':
            return 'Email atau password salah';
        case 'auth/wrong-password':
            return 'Email atau password salah';
        case 'auth/too-many-requests':
            return 'Terlalu banyak percobaan, coba lagi nanti';
        default:
            return 'Terjadi kesalahan, coba lagi';
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    mainWrapper: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 32,
    },
    titleWrapper: {
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontFamily: 'Inter_600SemiBold',
    },
    desc: {
        fontSize: 12,
        fontFamily: 'Inter_400Regular',
        opacity: 0.5,
        marginTop: 8,
    },
    form: {
        marginTop: 40,
    },
    label: {
        fontSize: 14,
        fontFamily: 'Inter_600SemiBold',
        marginBottom: 8,
        marginTop: 16,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 50,
        paddingHorizontal: 16,
        paddingLeft: 48,
        paddingVertical: 14,
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    errorText: {
        color: '#FF3B30',
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        marginTop: 12,
    },
    buttonLogin: {
        backgroundColor: '#000000',
        paddingVertical: 16,
        borderRadius: 50,
        marginTop: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Inter_600SemiBold',
    },
    registerLink: {
        textAlign: 'center',
        marginTop: 20,
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        opacity: 0.7,
    },
    registerLinkBold: {
        fontFamily: 'Inter_600SemiBold',
        color: '#0044FF',
        opacity: 1,
    },
    gradientContainer: {
        width: '100%',
        flex: 1,
        marginTop: 20,
        paddingTop: 20,
    },
    inputContainer: {

        position: 'relative',
    },
    icon: {
        width: 20,
        height: 20,
        position: 'absolute',
        zIndex: 1,
        left: 16,
        top: 14,
    },

});
