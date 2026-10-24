import { IconButton } from "@/components/ui/IconButton";
import { icons } from "@/constants/icons";
import { ThemeColors, type } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { CartLine } from "@/types/menu";
import { formatMoney } from "@/utils/format";
import { StyleSheet, Text, View } from "react-native";

type Props = { line: CartLine; onChangeQuantity: (id: string, delta: number) => void };

export function CartLineItem({ line, onChangeQuantity }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.line}>
      <View style={styles.info}>
        <Text style={styles.name}>{line.name}</Text>
        <Text style={styles.each}>{formatMoney(line.price)} each</Text>
      </View>
      <View style={styles.stepper}>
        <IconButton
          icon={icons.remove}
          label={`Remove one ${line.name}`}
          onPress={() => onChangeQuantity(line.id, -1)}
          variant="outlined"
        />
        <Text style={styles.quantity}>{line.quantity}</Text>
        <IconButton icon={icons.add} label={`Add one ${line.name}`} onPress={() => onChangeQuantity(line.id, 1)} variant="tonal" />
      </View>
      <Text style={styles.total}>{formatMoney(line.price * line.quantity)}</Text>
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    line: {
      paddingVertical: 12,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.outlineVariant,
    },
    info: { flex: 1 },
    name: { ...type.titleSmall, color: colors.onSurface },
    each: { ...type.bodySmall, color: colors.onSurfaceVariant },
    stepper: { flexDirection: "row", alignItems: "center", gap: 6 },
    quantity: { ...type.titleSmall, minWidth: 18, textAlign: "center", color: colors.onSurface },
    total: { ...type.titleSmall, minWidth: 58, textAlign: "right", color: colors.onSurface },
  });
}
