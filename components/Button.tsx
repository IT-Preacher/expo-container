import { colors, radii, spacing, typography } from "@/config";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";

type ButtonProps = {
  title: string;
  variant?: "primary" | "base" | "round";
  extraStyles?: ViewStyle;
  onPress?: () => void;
};

export function Button({
  title,
  variant = "primary",
  extraStyles,
  onPress,
}: ButtonProps) {
  return (
    <Pressable
      style={[styles.base, styles[variant], extraStyles]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 48,
    borderRadius: radii.pill,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  text: {
    color: "#fff",
    fontSize: typography.body,
    fontWeight: "600",
  },
  round: {
    borderRadius: radii.pill,
    backgroundColor: colors.primary,
    aspectRatio: 1,
    paddingHorizontal: 0,
    alignSelf: "center",
  },
});
