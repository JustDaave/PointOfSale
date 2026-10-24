import { AppIcon, AppIconName } from "@/components/AppIcon";
import { shape, ThemeColors } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";

// Material 3 icon buttons https://m3.material.io/components/icon-buttons
type Variant = "standard" | "filled" | "tonal" | "outlined";

type Props = {
  icon: AppIconName;
  label: string; // read by screen readers
  onPress: () => void;
  variant?: Variant;
  color?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function IconButton({ icon, label, onPress, variant = "standard", color, disabled = false, style }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const iconColor =
    color ??
    {
      standard: colors.onSurfaceVariant,
      filled: colors.onPrimary,
      tonal: colors.onSecondaryContainer,
      outlined: colors.onSurfaceVariant,
    }[variant];

  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      disabled={disabled}
      hitSlop={4}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variant === "filled" && styles.filled,
        variant === "tonal" && styles.tonal,
        variant === "outlined" && styles.outlined,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <AppIcon name={icon} color={iconColor} size={22} />
    </Pressable>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    button: { width: 40, height: 40, alignItems: "center", justifyContent: "center", borderRadius: shape.full },
    filled: { backgroundColor: colors.primary },
    tonal: { backgroundColor: colors.secondaryContainer },
    outlined: { borderWidth: 1, borderColor: colors.outlineVariant },
    pressed: { backgroundColor: colors.onSurface + "1A" },
    disabled: { opacity: 0.38 },
  });
}
