import { Card } from "@/components/ui/Card";
import { ThemeColors, type } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { StyleSheet, Text } from "react-native";

// Big number with a label, used for the daily totals
export function StatCard({ label, value }: { label: string; value: string }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <Card style={styles.card} variant="filled">
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </Card>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    card: { flexGrow: 1, flexBasis: 140, padding: 16, backgroundColor: colors.secondaryContainer },
    label: { ...type.labelLarge, color: colors.onSecondaryContainer },
    value: { ...type.headlineMedium, color: colors.onSecondaryContainer, marginTop: 4 },
  });
}
