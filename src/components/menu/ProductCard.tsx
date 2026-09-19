import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radii } from "@/constants/theme";
import { MenuItem } from "@/types/menu";

type Props = { item: MenuItem; width: number; onAdd: (item: MenuItem) => void };

export function ProductCard({ item, width, onAdd }: Props) {
  return (
    <Pressable onPress={() => onAdd(item)} style={({ pressed }) => [styles.card, { width }, pressed && styles.pressed]}>
      <View style={[styles.art, { backgroundColor: item.color }]}><Text style={styles.symbol}>{item.symbol}</Text></View>
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.name}>{item.name}</Text>
        <View style={styles.bottomRow}><Text style={styles.price}>${item.price.toFixed(2)}</Text><View style={styles.add}><Text style={styles.addText}>+</Text></View></View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { overflow: "hidden", borderWidth: 1, borderColor: colors.border, borderRadius: radii.medium, backgroundColor: colors.surface },
  art: { height: 92, alignItems: "center", justifyContent: "center" },
  symbol: { color: "rgba(23,32,27,0.58)", fontSize: 38, fontWeight: "300" },
  info: { padding: 13 },
  name: { color: colors.ink, fontSize: 14, fontWeight: "700" },
  bottomRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 9 },
  price: { color: colors.inkMuted, fontSize: 13, fontWeight: "600" },
  add: { width: 27, height: 27, alignItems: "center", justifyContent: "center", borderRadius: 9, backgroundColor: colors.primarySoft },
  addText: { color: colors.primary, fontSize: 20, lineHeight: 21 },
  pressed: { opacity: 0.72, transform: [{ scale: 0.99 }] },
});
