import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function ExpensesCard() {
    return (
        <View style={styles.container}>
            <View style={styles.CardWrapper}>
                <View style={styles.LeftSection}>
                    <View style={styles.Logo} />
                    <View style={styles.TextWrapper}>
                        <Text style={styles.ExpenseCategory}>Most Expenses</Text>
                        <Text style={styles.ExpenseAmount}>Rp 1.200.000</Text>
                    </View>
                </View>

                <Text style={styles.ExpensePersentase}>90%</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 15,
        backgroundColor: "#F8F8F8",
    },
    CardWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    LeftSection: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 16
    },
    Logo: {
        width: 20,
        height: 20,
        borderRadius: 50,
        backgroundColor: "#000",
    },
    TextWrapper: {
        display: "flex",
        flexDirection: "column",

    },
    ExpenseCategory: {
        fontSize: 16,
        fontFamily: "Inter_400Regular",
    },
    ExpenseAmount: {
        fontSize: 12,
        opacity: 0.5,
        fontFamily: "Inter_400Regular",
    },
    ExpensePersentase: {
        fontSize: 20,
        fontFamily: "Inter_400Regular",
        color: "#C02929",
    },
});