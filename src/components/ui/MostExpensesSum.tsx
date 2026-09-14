import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import ExpensesCard from '../ui/ExpensesCard';
import SegmentedControl from "../ui/HoverNav";

export default function MostExpensesSum() {
    return (
        <View style={styles.container}>
            <View style={styles.TitleWrapper}>
                <Text style={styles.Title}>Most Expenses</Text>
                <Link style={styles.detailLink} href="/#">
                    View The Details
                </Link>
            </View>

            {/* <View style={styles.NavigationContainer}>
                <View style={styles.NavigationWrapper}>
                    <View style={styles.NavigationItem}>
                        <Text style={styles.NavigationText}>Weekly</Text>
                        <Text style={styles.NavigationText}>Monthly</Text>
                    </View>
                </View>
            </View> */}
            <SegmentedControl />
            <View style={styles.CardContainer}>
                <ExpensesCard />
                <ExpensesCard />
                <ExpensesCard />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 15,
        gap: 16
    },
    TitleWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    Title: {
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
    },
    detailLink: {
        fontSize: 12,
        fontFamily: 'Inter_400Regular',
        color: '#0099ff',
    },
    CardContainer: {
        display: "flex",
        flexDirection: "column",
        gap: 5,
    },
});