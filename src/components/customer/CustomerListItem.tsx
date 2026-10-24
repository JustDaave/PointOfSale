import { CustomerAvatar } from "@/components/customer/CustomerAvatar";
import { IdStatusBadges } from "@/components/customer/IdStatusBadges";
import { Card } from "@/components/ui/Card";
import { ThemeColors, type } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { Customer } from "@/types/customer";
import { getAge } from "@/utils/format";
import { StyleSheet, Text, View } from "react-native";

type Props = { customer: Customer; visits: number; onPress: () => void };

export function CustomerListItem({ customer, visits, onPress }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const name = `${customer.firstName} ${customer.lastName}`;

  return (
    <Card accessibilityLabel={`Open ${name}`} onPress={onPress} style={styles.card} variant="outlined">
      <CustomerAvatar customer={customer} size={48} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.details}>
          Age {getAge(customer.birthDate)} · {visits} {visits === 1 ? "visit" : "visits"}
        </Text>
      </View>
      <IdStatusBadges customer={customer} />
    </Card>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    card: { padding: 16, flexDirection: "row", alignItems: "center", gap: 16 },
    info: { flex: 1 },
    name: { ...type.titleMedium, color: colors.onSurface },
    details: { ...type.bodyMedium, color: colors.onSurfaceVariant },
  });
}
