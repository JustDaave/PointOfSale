import { AppIcon, AppIconName } from "@/components/AppIcon";
import { elevation, shape, ThemeColors, type } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from "react-native";

// Material 3 extended floating action button https://m3.material.io/components/extended-fab
type Props = {
  icon: AppIconName;
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export function Fab({ icon, label, onPress, style }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.fab, pressed && styles.pressed, style]}
    >
      <AppIcon name={icon} color={colors.onPrimaryContainer} size={24} />
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    fab: {
      height: 56,
      paddingHorizontal: 16,
      paddingRight: 20,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      borderRadius: shape.large,
      backgroundColor: colors.primaryContainer,
      ...elevation.level3,
    },
    pressed: { opacity: 0.85 },
    label: { ...type.labelLarge, color: colors.onPrimaryContainer },
  });
}
