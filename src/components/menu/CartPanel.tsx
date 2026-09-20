import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors, radii } from "@/constants/theme";
import { CartLine } from "@/types/menu";
import { AppIcon } from "@/components/AppIcon";

type Props = { lines: CartLine[]; isPrinting: boolean; onChangeQuantity: (id: string, delta: number) => void; onCheckout: () => void };

export function CartPanel({ lines, isPrinting, onChangeQuantity, onCheckout }: Props) {
  const subtotal = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
  const tax = subtotal * 0.0825;
  const total = subtotal + tax;

  return (
    <View style={styles.panel}>
      <View style={styles.header}><View><Text style={styles.eyebrow}>CURRENT ORDER</Text><Text style={styles.title}>Table 12</Text></View><Pressable accessibilityLabel="Order options" style={styles.more}><AppIcon name={{ ios: "ellipsis", android: "more_horiz", web: "more_horiz" }} color={colors.inkMuted} size={21} /></Pressable></View>
      <View style={styles.meta}><Text style={styles.metaText}>Dine in</Text><View style={styles.metaDot} /><Text style={styles.metaText}>2 guests</Text></View>
      <ScrollView style={styles.lines} contentContainerStyle={styles.linesContent}>
        {lines.length === 0 ? (
          <View style={styles.empty}><AppIcon name={{ ios: "cart.badge.plus", android: "add_shopping_cart", web: "add_shopping_cart" }} color={colors.primary} size={37} /><Text style={styles.emptyTitle}>Start an order</Text><Text style={styles.emptyText}>Tap a menu item to add it here.</Text></View>
        ) : lines.map((line) => (
          <View key={line.id} style={styles.line}>
            <View style={styles.lineInfo}><Text style={styles.lineName}>{line.name}</Text><Text style={styles.linePrice}>${(line.price * line.quantity).toFixed(2)}</Text></View>
            <View style={styles.stepper}>
              <Pressable accessibilityLabel={`Remove one ${line.name}`} onPress={() => onChangeQuantity(line.id, -1)} style={styles.step}><AppIcon name={{ ios: "minus", android: "remove", web: "remove" }} color={colors.primary} size={16} /></Pressable>
              <Text style={styles.quantity}>{line.quantity}</Text>
              <Pressable accessibilityLabel={`Add one ${line.name}`} onPress={() => onChangeQuantity(line.id, 1)} style={styles.step}><AppIcon name={{ ios: "plus", android: "add", web: "add" }} color={colors.primary} size={16} /></Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.summary}>
        <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Subtotal</Text><Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text></View>
        <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Tax</Text><Text style={styles.summaryValue}>${tax.toFixed(2)}</Text></View>
        <View style={[styles.summaryRow, styles.totalRow]}><Text style={styles.totalLabel}>Total</Text><Text style={styles.total}>${total.toFixed(2)}</Text></View>
        <Pressable accessibilityRole="button" disabled={!lines.length || isPrinting} onPress={onCheckout} style={({ pressed }) => [styles.payButton, (!lines.length || isPrinting) && styles.disabled, pressed && styles.pressed]}><Text style={styles.payText}>{isPrinting ? "Opening printer…" : `Charge & print $${total.toFixed(2)}`}</Text><AppIcon name={{ ios: "printer.fill", android: "print", web: "print" }} color={colors.surface} size={19} /></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: { flex: 1, backgroundColor: colors.surface },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 22, paddingBottom: 8 },
  eyebrow: { color: colors.inkMuted, fontSize: 10, fontWeight: "800", letterSpacing: 1.2 },
  title: { color: colors.ink, fontSize: 24, fontWeight: "800", marginTop: 4 },
  more: { width: 40, height: 40, alignItems: "center", justifyContent: "center", borderRadius: 12, backgroundColor: colors.surfaceMuted },
  meta: { flexDirection: "row", alignItems: "center", gap: 7, paddingHorizontal: 22, paddingBottom: 17, borderBottomWidth: 1, borderBottomColor: colors.border },
  metaText: { color: colors.inkMuted, fontSize: 12 }, metaDot: { width: 3, height: 3, borderRadius: 2, backgroundColor: colors.inkMuted },
  lines: { flex: 1 }, linesContent: { paddingHorizontal: 22, paddingVertical: 8 },
  line: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: colors.border },
  lineInfo: { flexDirection: "row", justifyContent: "space-between", gap: 12 },
  lineName: { flex: 1, color: colors.ink, fontSize: 14, fontWeight: "700" }, linePrice: { color: colors.ink, fontSize: 14, fontWeight: "700" },
  stepper: { flexDirection: "row", alignItems: "center", alignSelf: "flex-start", gap: 11, marginTop: 10 },
  step: { width: 28, height: 28, alignItems: "center", justifyContent: "center", borderRadius: 9, backgroundColor: colors.surfaceMuted },
  quantity: { minWidth: 12, textAlign: "center", color: colors.ink, fontSize: 13, fontWeight: "700" },
  empty: { alignItems: "center", paddingTop: 70 }, emptyTitle: { color: colors.ink, fontSize: 17, fontWeight: "700", marginTop: 10 }, emptyText: { color: colors.inkMuted, fontSize: 13, marginTop: 5 },
  summary: { padding: 22, borderTopWidth: 1, borderTopColor: colors.border },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 9 }, summaryLabel: { color: colors.inkMuted, fontSize: 13 }, summaryValue: { color: colors.ink, fontSize: 13, fontWeight: "600" },
  totalRow: { alignItems: "center", marginTop: 5, marginBottom: 17 }, totalLabel: { color: colors.ink, fontSize: 16, fontWeight: "800" }, total: { color: colors.ink, fontSize: 22, fontWeight: "800" },
  payButton: { height: 52, paddingHorizontal: 18, borderRadius: radii.medium, flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: colors.primary },
  payText: { color: colors.surface, fontSize: 15, fontWeight: "800" }, disabled: { opacity: 0.35 }, pressed: { opacity: 0.82 },
});
