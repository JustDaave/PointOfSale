import { AppIcon } from "@/components/AppIcon";
import { icons } from "@/constants/icons";
import { shape, ThemeColors, type } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { Pressable, StyleSheet, Text } from "react-native";

// Material 3 filter chip https://m3.material.io/components/chips
type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export function Chip({ label, selected, onPress }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [styles.chip, selected && styles.selected, pressed && styles.pressed]}
    >
      {selected && <AppIcon name={icons.check} color={colors.onSecondaryContainer} size={16} />}
      <Text style={[styles.label, selected && styles.selectedLabel]}>{label}</Text>
    </Pressable>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    chip: {
      height: 32,
      paddingHorizontal: 16,
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      borderRadius: shape.small,
      borderWidth: 1,
      borderColor: colors.outlineVariant,
    },
    selected: { paddingLeft: 10, borderColor: colors.secondaryContainer, backgroundColor: colors.secondaryContainer },
    pressed: { opacity: 0.75 },
    label: { ...type.labelLarge, color: colors.onSurfaceVariant },
    selectedLabel: { color: colors.onSecondaryContainer },
  });
}
