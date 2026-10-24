import { AppIcon, AppIconName } from "@/components/AppIcon";
import { shape, ThemeColors, type } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { StyleSheet, Text, View } from "react-native";

// Small colored label, like an M3 assist chip that can't be pressed
type Props = {
  label: string;
  tone: "good" | "bad" | "neutral";
  icon?: AppIconName;
};

export function Badge({ label, tone, icon }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const toneColors = {
    good: { background: colors.primaryContainer, text: colors.onPrimaryContainer },
    bad: { background: colors.errorContainer, text: colors.onErrorContainer },
    neutral: { background: colors.surfaceContainerHighest, text: colors.onSurfaceVariant },
  }[tone];

  return (
    <View style={[styles.badge, { backgroundColor: toneColors.background }]}>
      {icon && <AppIcon name={icon} color={toneColors.text} size={14} />}
      <Text style={[styles.label, { color: toneColors.text }]}>{label}</Text>
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    badge: {
      height: 24,
      paddingHorizontal: 8,
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "flex-start",
      gap: 4,
      borderRadius: shape.small,
    },
    label: { ...type.labelMedium, color: colors.onSurface },
  });
}
