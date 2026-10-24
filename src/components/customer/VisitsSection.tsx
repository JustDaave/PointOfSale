import { SectionCard } from "@/components/customer/SectionCard";
import { icons } from "@/constants/icons";
import { ThemeColors, type } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { Order } from "@/types/order";
import { formatDateTime, formatMoney } from "@/utils/format";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

// Every saved order linked to this customer counts as one visit
export function VisitsSection({ orders, style }: { orders: Order[]; style?: StyleProp<ViewStyle> }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <SectionCard icon={icons.history} style={style} title="Visits">
      <Text style={styles.count}>{orders.length}</Text>
      {orders.length === 0 && <Text style={styles.empty}>No visits yet. Start an order to record one.</Text>}
      {orders.slice(0, 4).map((order) => (
        <View key={order.id} style={styles.visit}>
          <Text style={styles.date}>{formatDateTime(order.createdAt)}</Text>
          <Text style={styles.total}>{formatMoney(order.total)}</Text>
        </View>
      ))}
    </SectionCard>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    count: { ...type.displaySmall, color: colors.onSurface },
    empty: { ...type.bodyMedium, color: colors.onSurfaceVariant },
    visit: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 6,
      borderTopWidth: 1,
      borderTopColor: colors.outlineVariant,
    },
    date: { ...type.bodyMedium, color: colors.onSurfaceVariant },
    total: { ...type.labelLarge, color: colors.onSurface },
  });
}
