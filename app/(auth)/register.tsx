import { useState } from "react";
import { View, Text, KeyboardAvoidingView, TextInput, Pressable, Platform, ActivityIndicator, StyleSheet, Image } from "react-native";
import { router } from "expo-router";
import { registerUser } from "../../src/services/authService";

export default function RegisterScreen() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function handleRegister() {
        if (!username || !email || !password || !confirmPassword) {
            setErrorMessage("Please fill in all fields.");
            return;
        }

        if (password.length < 6) {
            setErrorMessage("Password must be at least 6 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        setLoading(true);
        setErrorMessage("");

        try {
            await registerUser(email, password, username);
            router.replace("/home");
        } catch (error: any) {
            console.log('Error code:', error.code); // tambahkan baris ini
            console.log('Error message:', error.message); // dan ini
            setErrorMessage(getErrorMessage(error.code));
        } finally {
            setLoading(false);
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.mainWrapper}>
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.desc}>Start managing your finances today</Text>

                <View style={styles.form}>
                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Dicky Aprizal"
                        placeholderTextColor="#999"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="words"
                    />
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="you@example.com"
                        placeholderTextColor="#999"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />

                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="••••••••"
                        placeholderTextColor="#999"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="••••••••"
                        placeholderTextColor="#999"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                    />

                    {errorMessage ? (
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    ) : null}

                    <Pressable
                        style={styles.buttonRegister}
                        onPress={handleRegister}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Register</Text>
                        )}
                    </Pressable>

                    <Pressable onPress={() => router.push('/(auth)/login')}>
                        <Text style={styles.loginLink}>
                            Already have an account? <Text style={styles.loginLinkBold}>Login</Text>
                        </Text>
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

// Terjemahkan Firebase error code jadi pesan yang lebih ramah user
function getErrorMessage(errorCode: string): string {
    switch (errorCode) {
        case 'auth/invalid-email':
            return 'Format email tidak valid';
        case 'auth/email-already-in-use':
            return 'Email sudah terdaftar, silakan login';
        case 'auth/weak-password':
            return 'Password terlalu lemah, minimal 6 karakter';
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
    title: {
        fontSize: 32,
        fontFamily: 'Inter_600SemiBold',
    },
    desc: {
        fontSize: 16,
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
        borderRadius: 12,
        paddingHorizontal: 16,
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
    buttonRegister: {
        backgroundColor: '#0044FF',
        paddingVertical: 16,
        borderRadius: 15,
        marginTop: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Inter_600SemiBold',
    },
    loginLink: {
        textAlign: 'center',
        marginTop: 20,
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        opacity: 0.7,
    },
    loginLinkBold: {
        fontFamily: 'Inter_600SemiBold',
        color: '#000000',
        opacity: 1,
    },
});