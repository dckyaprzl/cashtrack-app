import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useState } from 'react';
import { useAuthStore } from '../src/store/useAuthStore';
import AiInsight from '../src/components/ui/AiInsight';
import DailySpendingSum from '../src/components/ui/DailySpendingSum';
import MostExpensesSum from '../src/components/ui/MostExpensesSum';
import { signOut } from "../src/services/authService";
import { router } from "expo-router";
import { Eye } from 'lucide-react-native';
import { EyeOff } from 'lucide-react-native';

export default function App() {
    const user = useAuthStore((state) => state.user);
    const [isProfileMenuVisible, setIsProfileMenuVisible] = useState(false);
    const [isBalanceVisible, setIsBalanceVisible] = useState(true);

    async function handleLogout() {
        try {
            await signOut();
            router.replace('/'); // balik ke Get Started (app/index.tsx)
        } catch (error) {
            console.log('Gagal logout:', error);
        }
    }
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.headerArea}>
                <View style={styles.greetingContainer}>
                    <Text style={styles.greetingText}>
                        Hi,
                    </Text>
                    <Text style={styles.nameText}>
                        {user?.displayName || user?.email}
                    </Text>
                </View>
                <View style={styles.headerBtn}>
                    <Pressable style={styles.notifBtnWrapper} onPress={() => router.push('/AiInsight')} accessibilityRole="button" accessibilityLabel="Buka halaman AI Insight">
                        <Image source={require('../assets/images/notif-icon.png')} style={styles.notifBtnIcon} />
                    </Pressable>
                    <View style={styles.profileMenuWrapper}>
                        <Pressable
                            style={styles.profileBtnWrapper}
                            onPress={() => setIsProfileMenuVisible((visible) => !visible)}
                            accessibilityRole="button"
                            accessibilityLabel="Buka menu profil"
                        >
                            <Image source={require('../assets/images/profile-icon.png')} style={styles.profileBtnIcon} />
                        </Pressable>
                        {isProfileMenuVisible && (
                            <View style={styles.profileMenu}>
                                <Text style={styles.profileMenuEmail} numberOfLines={1}>
                                    {user?.email}
                                </Text>
                                <Pressable
                                    style={styles.profileMenuItem}
                                    onPress={handleLogout}
                                    accessibilityRole="button"
                                >
                                    <Text style={styles.profileMenuLogoutText}>Logout</Text>
                                </Pressable>
                            </View>
                        )}
                    </View>
                </View>
            </View>
            <View style={styles.financeSummary}>
                <LinearGradient
                    colors={['#AEE2FF', '#D9F9DF', '#9FA1FF']}
                    locations={[0.1, 0.55, 1]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientContainer}
                >
                    <View style={styles.balanceCard}>
                        <View style={styles.balanceWrapper}>
                            <View style={styles.balanceTextWrapper}>
                                <Text style={styles.balanceText}>Available Balance</Text>
                                <Pressable
                                    onPress={() => setIsBalanceVisible((prev) => !prev)}
                                >
                                    {isBalanceVisible ? (
                                        <EyeOff size={20} color="#000" />
                                    ) : (
                                        <Eye size={20} color="#000" />
                                    )}
                                </Pressable>
                            </View>
                            {isBalanceVisible ? (
                                <Text style={styles.balanceAmount}>Rp ***********</Text>
                            ) : (
                                <Text style={styles.balanceAmount}>Rp 000,000,000.00</Text>
                            )}
                        </View>
                    </View>
                </LinearGradient>
                <View style={styles.cashFlowSummary}>
                    <View style={styles.cashFlowItem}>
                        <View style={[styles.cashFlowContainerIcon, { backgroundColor: '#B9FFC6' }]}>
                            <Image source={require('../assets/images/arrow-rise.png')} style={styles.cashFlowIcon} />
                        </View>
                        <View style={styles.cashFlowContainerText}>
                            <Text style={styles.cashFlowLabel}>Income</Text>
                            <Text style={styles.cashFlowAmount}>Rp105K</Text>
                        </View>
                    </View>
                    <View style={styles.cashFlowItem}>
                        <View style={[styles.cashFlowContainerIcon, { backgroundColor: '#FDACAC', borderRadius: 10 }]}>
                            <Image source={require('../assets/images/descent-icon.png')} style={styles.cashFlowIcon} />
                        </View>
                        <View style={styles.cashFlowContainerText}>
                            <Text style={styles.cashFlowLabel}>Expenses</Text>
                            <Text style={styles.cashFlowAmount}>Rp50K</Text>
                        </View>
                    </View>
                </View>
            </View>
            <AiInsight />
            <DailySpendingSum />
            <MostExpensesSum />
            <StatusBar style="auto" />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    contentContainer: {
        paddingHorizontal: 25,
        paddingBottom: 20,
        gap: 16,
    },
    headerArea: {
        width: '100%',
        flexDirection: 'row',
        // display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginTop: 25,
    },
    greetingContainer: {
        display: 'flex',
    },
    greetingText: {
        opacity: 0.5,
        fontSize: 16,
        fontFamily: 'Inter_200ExtraLight',
    },
    nameText: {
        fontSize: 24,
        fontFamily: 'Inter_600SemiBold',
    },
    headerBtn: {
        flexDirection: 'row',
    },
    profileMenuWrapper: {
        position: 'relative',
    },
    notifBtnWrapper: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    notifBtnIcon: {
        width: 20,
        height: 20,
    },
    profileBtnWrapper: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    profileBtnIcon: {
        width: 40,
        height: 40,
    },
    profileMenu: {
        position: 'absolute',
        top: 48,
        right: 0,
        width: 180,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 8,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        zIndex: 10,
    },
    profileMenuEmail: {
        color: '#666',
        fontSize: 12,
        fontFamily: 'Inter_400Regular',
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    profileMenuItem: {
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    profileMenuLogoutText: {
        color: '#FF3B30',
        fontSize: 14,
        fontFamily: 'Inter_600SemiBold',
    },
    financeSummary: {
        width: '100%',
        height: 'auto',
        backgroundColor: '#ffff',
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
        gap: 16
    },
    balanceCard: {
        width: 290,
        height: 124,
        // backgroundColor: '#9FA1FF',
        borderRadius: 20,
        alignItems: 'center',
        padding: 10,
    },
    balanceWrapper: {
        width: '100%',
        padding: 10,
    },
    balanceTextWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    balanceText: {
        fontSize: 12,
        fontFamily: 'Inter_400Regular',
        opacity: 0.5,
    },
    visibilityIcon: {
        width: 20,
        height: 20,
        marginLeft: 10,
    },
    gradientContainer: {
        borderRadius: 20,
    },
    balanceAmount: {
        fontSize: 24,
        fontFamily: 'Inter_600SemiBold',
        marginTop: 10,
    },
    cashFlowSummary: {
        width: '100%',
        // backgroundColor: '#524949',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cashFlowItem: {
        width: 140,
        height: 60,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    cashFlowContainerIcon: {
        width: 40,
        height: 40,
        borderRadius: 10,
    },
    cashFlowIcon: {
        width: 20,
        height: 20,
        margin: 10,
    },
    cashFlowContainerText: {
        marginTop: 5,
        marginLeft: 10,

    },
    cashFlowLabel: {
        fontSize: 12,
        fontFamily: 'Inter_400Regular',
        opacity: 0.5,
    },
    cashFlowAmount: {
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
    },
});