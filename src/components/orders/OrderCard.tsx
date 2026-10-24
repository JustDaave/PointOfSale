import { Card } from "@/components/ui/Card";
import { IconButton } from "@/components/ui/IconButton";
import { icons } from "@/constants/icons";
import { ThemeColors, type } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { Order } from "@/types/order";
import { formatDateTime, formatMoney } from "@/utils/format";
import { StyleSheet, Text, View } from "react-native";

type Props = { order: Order; onReprint: (order: Order) => void };

export function OrderCard({ order, onReprint }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const itemSummary = order.lines.map((line) => `${line.quantity}× ${line.name}`).join(", ");

  return (
    <Card style={styles.card} variant="outlined">
      <View style={styles.top}>
        <View style={styles.flex}>
          <Text style={styles.number}>Order #{order.number}</Text>
          <Text style={styles.meta}>
            {formatDateTime(order.createdAt)} · {order.customerName ?? "Walk-in"} · Served by {order.staffName}
          </Text>
        </View>
        <Text style={styles.total}>{formatMoney(order.total)}</Text>
        <IconButton icon={icons.print} label={`Reprint receipt for order ${order.number}`} onPress={() => onReprint(order)} />
      </View>
      <Text numberOfLines={2} style={styles.items}>
        {itemSummary}
      </Text>
    </Card>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    card: { padding: 16, gap: 8 },
    top: { flexDirection: "row", alignItems: "center", gap: 12 },
    flex: { flex: 1 },
    number: { ...type.titleMedium, color: colors.onSurface },
    meta: { ...type.bodySmall, color: colors.onSurfaceVariant },
    total: { ...type.titleMedium, color: colors.onSurface },
    items: { ...type.bodyMedium, color: colors.onSurfaceVariant },
  });
}
