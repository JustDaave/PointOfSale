import { AppIcon, AppIconName } from "@/components/AppIcon";
import { ThemeColors, type } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

// One line of customer details, like an M3 list item: icon, small label, then the value
type Props = {
  icon: AppIconName;
  label: string;
  value?: string;
  children?: ReactNode; // for values that need more than plain text
};

export function InfoRow({ icon, label, value, children }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.row}>
      <AppIcon name={icon} color={colors.onSurfaceVariant} size={22} />
      <View style={styles.text}>
        <Text style={styles.label}>{label}</Text>
        {value !== undefined && <Text style={styles.value}>{value}</Text>}
        {children}
      </View>
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    row: { minHeight: 56, paddingVertical: 8, flexDirection: "row", alignItems: "center", gap: 16 },
    text: { flex: 1, gap: 2 },
    label: { ...type.labelMedium, color: colors.onSurfaceVariant },
    value: { ...type.bodyLarge, color: colors.onSurface },
  });
}
