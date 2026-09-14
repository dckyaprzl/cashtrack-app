import { View, Text, StyleSheet, Image } from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";


export default function AiInsight() {
    const [insight, setInsight] = useState<string | null>(null);

    useEffect(() => {
        async function fetchInsight() {
            try {
                // const response = await fetch("https://api.example.com/ai-insight");
                // const data = await response.json();
                // setInsight(data.insight);
            } catch (error) {
                console.error("Error fetching AI insight:", error);
            }
        }

        fetchInsight();
    }, []);

    return (
        <View style={styles.page}>
            <LinearGradient
                colors={['#FF7018', '#E5E5E5', '#8770FE', '#07C1E2']}
                locations={[0.03, 0.25, 0.75, 1]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientContainer}
            >
                <View style={styles.InsightContainer}>
                    <View style={styles.InsightWrapper}>
                        <View style={[styles.IconWrapper, { backgroundColor: "#000000" }]}>
                            <Image source={require('../../../assets/images/ai-icon.png')} style={styles.InsightIcon} />
                        </View>
                        <View style={styles.InsightTextWrapper}>
                            <Text style={styles.InsightTitle}>AI Insight</Text>
                            <Text style={styles.InsightDescription}>Evaluate Your Spending Patterns</Text>
                        </View>
                    </View>
                    <View style={styles.IconWrapper}>
                        <Image source={require('../../../assets/images/up-right-arrow.png')} style={styles.shortcutIcon} />
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 25,
    },
    InsightContainer: {
        padding: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: '100%',
        height: 60,
        borderRadius: 15,
    },
    InsightWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
    },
    IconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    InsightIcon: {
        width: 20,
        height: 20,
    },
    InsightTextWrapper: {
        display: "flex",
        flexDirection: "column",
    },
    shortcutIcon: {
        width: 20,
        height: 20,
    },
    InsightTitle: {
        fontSize: 16,
        fontFamily: "Inter_400Regular",
    },
    InsightDescription: {
        fontSize: 12,
        fontFamily: "Inter_400Regular",
        opacity: 0.5,
    },
        gradientContainer: {
        borderRadius: 15,
    },
}); 