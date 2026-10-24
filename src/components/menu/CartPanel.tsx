import { AppIcon } from "@/components/AppIcon";
import { CartLineItem } from "@/components/menu/CartLineItem";
import { OrderCustomer } from "@/components/menu/OrderCustomer";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { icons } from "@/constants/icons";
import { ThemeColors, type } from "@/constants/theme";
import { useOrder } from "@/context/OrderContext";
import { useTheme } from "@/context/ThemeContext";
import { formatMoney } from "@/utils/format";
import { calculateTotals } from "@/utils/orders";
import { ScrollView, StyleSheet, Text, View } from "react-native";

// The current order. Reads the cart from OrderContext so the screens
// don't have to pass the cart and all its functions down as props.
type Props = { isCheckingOut: boolean; onCheckout: () => void };

export function CartPanel({ isCheckingOut, onCheckout }: Props) {
  const { colors } = useTheme();
  const { cart, changeQuantity, clearOrder } = useOrder();
  const styles = createStyles(colors);
  const { subtotal, tax, total, itemCount } = calculateTotals(cart);

  return (
    <View style={styles.panel}>
      <View style={styles.header}>
        <View style={styles.flex}>
          <Text style={styles.eyebrow}>Current order</Text>
          <Text style={styles.title}>
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </Text>
        </View>
        <IconButton disabled={cart.length === 0} icon={icons.clearOrder} label="Clear order" onPress={clearOrder} />
      </View>
      <View style={styles.customer}>
        <OrderCustomer />
      </View>

      <ScrollView contentContainerStyle={styles.linesContent} style={styles.flex}>
        {cart.length === 0 ? (
          <View style={styles.empty}>
            <AppIcon name={icons.cart} color={colors.primary} size={36} />
            <Text style={styles.emptyTitle}>Start an order</Text>
            <Text style={styles.emptyText}>Tap a menu item to add it here.</Text>
          </View>
        ) : (
          cart.map((line) => <CartLineItem key={line.id} line={line} onChangeQuantity={changeQuantity} />)
        )}
      </ScrollView>

      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>{formatMoney(subtotal)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tax</Text>
          <Text style={styles.summaryValue}>{formatMoney(tax)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.total}>{formatMoney(total)}</Text>
        </View>
        <Button
          disabled={cart.length === 0 || isCheckingOut}
          icon={icons.print}
          label={isCheckingOut ? "Opening printer…" : `Charge & print ${formatMoney(total)}`}
          large
          onPress={onCheckout}
          style={styles.payButton}
        />
      </View>
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    panel: { flex: 1, backgroundColor: colors.surfaceContainerLow },
    flex: { flex: 1 },
    header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingTop: 16 },
    eyebrow: { ...type.labelMedium, color: colors.onSurfaceVariant },
    title: { ...type.headlineSmall, color: colors.onSurface },
    customer: {
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.outlineVariant,
    },
    linesContent: { paddingHorizontal: 20 },
    empty: { alignItems: "center", paddingVertical: 48 },
    emptyTitle: { ...type.titleMedium, color: colors.onSurface, marginTop: 8 },
    emptyText: { ...type.bodyMedium, color: colors.onSurfaceVariant },
    summary: { padding: 20, gap: 6, borderTopWidth: 1, borderTopColor: colors.outlineVariant },
    summaryRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    summaryLabel: { ...type.bodyMedium, color: colors.onSurfaceVariant },
    summaryValue: { ...type.bodyMedium, color: colors.onSurface },
    totalLabel: { ...type.titleMedium, color: colors.onSurface },
    total: { ...type.headlineSmall, color: colors.onSurface },
    payButton: { marginTop: 10 },
  });
}
