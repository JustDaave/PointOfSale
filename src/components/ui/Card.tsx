import { elevation, shape, ThemeColors } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { ReactNode } from "react";
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

// Material 3 cards https://m3.material.io/components/cards
type Props = {
  children: ReactNode;
  variant?: "elevated" | "filled" | "outlined";
  onPress?: () => void;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};

export function Card({ children, variant = "filled", onPress, accessibilityLabel, style }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const cardStyle = [styles.card, styles[variant], style];

  // Only make the card pressable when it actually does something
  if (!onPress) return <View style={cardStyle}>{children}</View>;

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [cardStyle, pressed && styles.pressed]}
    >
      {children}
    </Pressable>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    card: { borderRadius: shape.medium, overflow: "hidden" },
    elevated: { backgroundColor: colors.surfaceContainerLow, ...elevation.level1 },
    filled: { backgroundColor: colors.surfaceContainerHighest },
    outlined: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.outlineVariant },
    pressed: { opacity: 0.8 },
  });
}
