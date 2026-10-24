import { Button } from "@/components/ui/Button";
import { icons } from "@/constants/icons";
import { elevation, ThemeColors, type } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { formatMoney } from "@/utils/format";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Bar at the bottom of the phone layout (Mobile mockup): "PAY $100.24 / 10 Items" + SEND.
// Tapping the total opens the full order so items can be changed.
type Props = {
  total: number;
  itemCount: number;
  sending: boolean;
  onOpenOrder: () => void;
  onSend: () => void;
};

export function OrderSummaryBar({ total, itemCount, sending, onOpenOrder, onSend }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { paddingBottom: 12 + insets.bottom }]}>
      <Pressable
        accessibilityHint="Opens the current order"
        accessibilityRole="button"
        onPress={onOpenOrder}
        style={({ pressed }) => [styles.summary, pressed && styles.pressed]}
      >
        <Text style={styles.total}>Pay {formatMoney(total)}</Text>
        <Text style={styles.items}>
          {itemCount} {itemCount === 1 ? "item" : "items"} · View order
        </Text>
      </Pressable>
      <Button disabled={itemCount === 0 || sending} icon={icons.send} label={sending ? "Sending…" : "Send"} large onPress={onSend} />
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    bar: {
      paddingHorizontal: 16,
      paddingTop: 12,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      backgroundColor: colors.surfaceContainer,
      ...elevation.level2,
    },
    summary: { flex: 1, paddingVertical: 4 },
    pressed: { opacity: 0.7 },
    total: { ...type.titleLarge, fontWeight: "700", color: colors.onSurface },
    items: { ...type.bodyMedium, color: colors.onSurfaceVariant },
  });
}
