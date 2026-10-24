import { AppIcon, AppIconName } from "@/components/AppIcon";
import { Card } from "@/components/ui/Card";
import { ThemeColors, type } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { ReactNode } from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

// Card with a title used for the Cards / Visits / Favorite Products boxes
type Props = {
  title: string;
  icon: AppIconName;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function SectionCard({ title, icon, children, style }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <Card style={[styles.card, style]} variant="filled">
      <View style={styles.header}>
        <AppIcon name={icon} color={colors.primary} size={20} />
        <Text style={styles.title}>{title}</Text>
      </View>
      {children}
    </Card>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    card: { padding: 16, gap: 12, backgroundColor: colors.surfaceContainerHigh },
    header: { flexDirection: "row", alignItems: "center", gap: 8 },
    title: { ...type.titleMedium, color: colors.onSurface },
  });
}
