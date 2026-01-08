import { layout, radii, spacing, typography } from "@/config";
import { Href, router } from "expo-router";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.7;
const SPACING = (width - ITEM_WIDTH) / 2;

const APP_LIST = [
  {
    name: "Planer",
    description: "",
    screen: null,
    path: "/planer",
  },
  {
    name: "Note",
    description: "",
    screen: null,
    path: null,
  },
  {
    name: "",
    description: "",
    screen: null,
    path: null,
  },
] as const;

type Feature = (typeof APP_LIST)[number];

const ListItem = ({
  item,
  index,
  x,
}: {
  item: Feature;
  index: number;
  x: SharedValue<number>;
}) => {
  const rStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * ITEM_WIDTH,
      index * ITEM_WIDTH,
      (index + 1) * ITEM_WIDTH,
    ];

    const scale = interpolate(
      x.value,
      inputRange,
      [0.9, 1.1, 0.9],
      Extrapolation.CLAMP,
    );

    const opacity = interpolate(
      x.value,
      inputRange,
      [0.6, 1, 0.6],
      Extrapolation.CLAMP,
    );

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <Pressable
      style={styles.item}
      onPress={() => item.path && router.push(item.path as Href)}
    >
      <Animated.View style={rStyle}>
        <Text>{item.name || "Empty"}</Text>
      </Animated.View>
    </Pressable>
  );
};

export default function Home() {
  const x = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  return (
    <SafeAreaView>
      <View
        style={{ paddingHorizontal: layout.screenPadding, gap: spacing.md }}
      >
        <Text style={{ fontSize: typography.h1 }}>
          Welcome to the App Container
        </Text>
        <Text style={{ fontSize: typography.body }}>
          Discover and test various mini-applications in one convenient place.
          Each app is designed to be lightweight yet powerful, offering specific
          functionalities without cluttering your device.
        </Text>
      </View>
      <Animated.FlatList
        data={APP_LIST}
        renderItem={({ item, index }) => (
          <ListItem item={item} index={index} x={x} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: SPACING,
          paddingVertical: 20,
        }}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  item: {
    width: ITEM_WIDTH,
    height: 500,
    backgroundColor: "purple",
    borderRadius: radii.md,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
  },
});
