import { AppIcon, AppIconName } from "@/components/AppIcon";
import { shape, ThemeColors, type } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from "react-native";

// Material 3 common buttons https://m3.material.io/components/buttons
type Variant = "filled" | "tonal" | "outlined" | "text";

type Props = {
  label: string;
  onPress: () => void;
  variant?: Variant;
  icon?: AppIconName;
  disabled?: boolean;
  large?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Button({ label, onPress, variant = "filled", icon, disabled = false, large = false, style }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const containerStyle = {
    filled: styles.filled,
    tonal: styles.tonal,
    outlined: styles.outlined,
    text: styles.text,
  }[variant];

  const contentColor = disabled
    ? colors.onSurface + "61" // 38% opacity, the M3 disabled color
    : {
        filled: colors.onPrimary,
        tonal: colors.onSecondaryContainer,
        outlined: colors.primary,
        text: colors.primary,
      }[variant];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        large && styles.large,
        icon ? styles.withIcon : null,
        containerStyle,
        disabled && variant !== "text" && styles.disabled,
        pressed && styles.pressed,
        style,
      ]}
    >
      {icon && <AppIcon name={icon} color={contentColor} size={large ? 22 : 18} />}
      <Text style={[large ? type.titleMedium : type.labelLarge, { color: contentColor }]}>{label}</Text>
    </Pressable>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    button: {
      height: 40,
      paddingHorizontal: 24,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      borderRadius: shape.full,
    },
    large: { height: 56, paddingHorizontal: 28 },
    withIcon: { paddingLeft: 16 },
    filled: { backgroundColor: colors.primary },
    tonal: { backgroundColor: colors.secondaryContainer },
    outlined: { borderWidth: 1, borderColor: colors.outline },
    text: { paddingHorizontal: 12 },
    disabled: { backgroundColor: colors.onSurface + "1F", borderColor: colors.onSurface + "1F" }, // 12% opacity
    pressed: { opacity: 0.85 },
  });
}
