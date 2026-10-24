import { ProductCard } from "@/components/menu/ProductCard";
import { ThemeColors, type } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { MenuItem } from "@/types/menu";
import { ReactNode, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const GAP = 12;
const MIN_CARD_WIDTH = 150;

type Props = {
  items: MenuItem[];
  soldCounts: Record<string, number>;
  onAdd: (item: MenuItem) => void;
  emptyMessage: string;
  header?: ReactNode;
  bottomPadding?: number;
};

// Fits as many columns as possible into the space it has.
// Used by both the tablet and the phone layout.
export function ProductGrid({ items, soldCounts, onAdd, emptyMessage, header, bottomPadding = 24 }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [gridWidth, setGridWidth] = useState(0);

  const columns = Math.max(2, Math.floor((gridWidth + GAP) / (MIN_CARD_WIDTH + GAP)));
  const cardWidth = Math.floor((gridWidth - (columns - 1) * GAP) / columns);

  return (
    <ScrollView contentContainerStyle={[styles.content, { paddingBottom: bottomPadding }]} showsVerticalScrollIndicator={false}>
      {header}
      <View onLayout={(event) => setGridWidth(event.nativeEvent.layout.width)} style={styles.grid}>
        {gridWidth > 0 &&
          items.map((item) => (
            <ProductCard item={item} key={item.id} onAdd={onAdd} soldCount={soldCounts[item.id] ?? 0} width={cardWidth} />
          ))}
        {items.length === 0 && <Text style={styles.empty}>{emptyMessage}</Text>}
      </View>
    </ScrollView>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    content: { paddingHorizontal: 16, paddingTop: 16 },
    grid: { flexDirection: "row", flexWrap: "wrap", gap: GAP },
    empty: { ...type.bodyMedium, width: "100%", paddingVertical: 48, color: colors.onSurfaceVariant, textAlign: "center" },
  });
}
