import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DailySpendingSum() {
    return (
        <View style={styles.container}>
            <View style={styles.DailySpendWrapper}>
                <Text style={styles.DailySpendTitle}>Daily Spending Consumption</Text>
                <View style={styles.DailySpendValueWrapper}>
                    <Text style={styles.DailySpendValue}>Rp120K</Text>
                    <Text style={styles.DailySpendTarget}>Goal: Rp200K/day</Text>
                </View>
                <View style={styles.ChartWrapper}>
                    <View style={[styles.ChartBar, { width: '60%', backgroundColor: '#4CAF50' }]} />
                    <View style={[styles.ChartBar, { width: '20%', backgroundColor: '#FFC107' }]} />
                    <View style={[styles.ChartBar, { width: '10%', backgroundColor: '#F44336' }]} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    DailySpendWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },
    DailySpendTitle: {
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
    },
    DailySpendValueWrapper: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    DailySpendValue: {
        fontSize: 24,
        fontFamily: 'Inter_600SemiBold',
    },
    DailySpendTarget: {
        fontSize: 12,
        fontFamily: 'Inter_400Regular', 
    },
    ChartWrapper: {
        width: '100%',
        height: 10,
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
    },
    ChartBar: {
        height: '100%',
        borderRadius: 5,
    },
});
