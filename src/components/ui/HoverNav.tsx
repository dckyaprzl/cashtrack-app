import { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, StyleSheet, LayoutChangeEvent, Animated } from 'react-native';

const OPTIONS = ['Weekly', 'Monthly'];
const CONTAINER_PADDING = 4;
const ACTIVE_BACKGROUND_INSET = 12;
const ACTIVE_BACKGROUND_VERTICAL_INSET = 10;

export default function SegmentedControl() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const activeBackgroundWidth = Math.max(itemWidth - ACTIVE_BACKGROUND_INSET * 2, 0);

  useEffect(() => {
    if (itemWidth <= 0) return;

    Animated.spring(translateX, {
      toValue: selectedIndex * itemWidth,
      damping: 18,
      stiffness: 250,
      mass: 0.8,
      useNativeDriver: true,
    }).start();
  }, [selectedIndex, itemWidth, translateX]);

  function handleLayout(event: LayoutChangeEvent) {
    const containerWidth = event.nativeEvent.layout.width;
    const contentWidth = Math.max(containerWidth - CONTAINER_PADDING * 2, 0);
    setItemWidth(contentWidth / OPTIONS.length);
  }

  return (
    <View style={styles.container} onLayout={handleLayout}>
      {itemWidth > 0 && (
        <Animated.View
          style={[
            styles.activeBackground,
            {
              width: activeBackgroundWidth,
              left: CONTAINER_PADDING + (itemWidth - activeBackgroundWidth) / 2,
              transform: [{ translateX }],
            },
          ]}
        />
      )}

      {OPTIONS.map((option, index) => (
        <Pressable
          key={option}
          style={styles.item}
          onPress={() => setSelectedIndex(index)}
        >
          <Text
            style={[
              styles.text,
              selectedIndex === index && styles.textActive,
            ]}
          >
            {option}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 4,
    height: 60,
    position: 'relative',
  },
  activeBackground: {
    position: 'absolute',
    top: ACTIVE_BACKGROUND_VERTICAL_INSET,
    bottom: ACTIVE_BACKGROUND_VERTICAL_INSET,
    left: 0,
    backgroundColor: '#000000',
    borderRadius: 20,
  },
  item: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1, // supaya teks tetap di atas background pill
  },
  text: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#000000',
  },
  textActive: {
    color: '#FFFFFF',
  },
});