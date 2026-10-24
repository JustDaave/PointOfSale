import { AppIcon } from "@/components/AppIcon";
import { Card } from "@/components/ui/Card";
import { icons } from "@/constants/icons";
import { shape, ThemeColors, type } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { MenuItem } from "@/types/menu";
import { formatMoney } from "@/utils/format";
import { StyleSheet, Text, View } from "react-native";

type Props = { item: MenuItem; width: number; soldCount: number; onAdd: (item: MenuItem) => void };

export function ProductCard({ item, width, soldCount, onAdd }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <Card accessibilityLabel={`Add ${item.name}`} onPress={() => onAdd(item)} style={{ width }} variant="outlined">
      <View style={[styles.art, { backgroundColor: item.color }]}>
        <AppIcon name={item.icon} color="rgba(23, 32, 27, 0.6)" size={40} />
        {soldCount > 0 && (
          <View style={styles.soldBadge}>
            <Text style={styles.soldText}>{soldCount} sold</Text>
          </View>
        )}
      </View>
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.name}>
          {item.name}
        </Text>
        <View style={styles.bottomRow}>
          <Text style={styles.price}>{formatMoney(item.price)}</Text>
          <View style={styles.add}>
            <AppIcon name={icons.add} color={colors.onSecondaryContainer} size={18} />
          </View>
        </View>
      </View>
    </Card>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    art: { height: 92, alignItems: "center", justifyContent: "center" },
    soldBadge: {
      position: "absolute",
      top: 8,
      right: 8,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: shape.full,
      backgroundColor: "rgba(255, 255, 255, 0.85)",
    },
    soldText: { ...type.labelSmall, color: "#17201B" },
    info: { padding: 12 },
    name: { ...type.titleSmall, color: colors.onSurface },
    bottomRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 8 },
    price: { ...type.bodyMedium, color: colors.onSurfaceVariant },
    add: {
      width: 28,
      height: 28,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: shape.full,
      backgroundColor: colors.secondaryContainer,
    },
  });
}
