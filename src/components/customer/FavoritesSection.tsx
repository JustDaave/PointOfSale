import { SectionCard } from "@/components/customer/SectionCard";
import { icons } from "@/constants/icons";
import { shape, ThemeColors, type } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { Order } from "@/types/order";
import { getFavoriteProducts } from "@/utils/orders";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

export function FavoritesSection({ orders, style }: { orders: Order[]; style?: StyleProp<ViewStyle> }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const favorites = getFavoriteProducts(orders);

  return (
    <SectionCard icon={icons.favorite} style={style} title="Favorite Products">
      {favorites.length === 0 && <Text style={styles.empty}>Favorites show up after the first order.</Text>}
      {favorites.map((product, index) => (
        <View key={product.id} style={styles.row}>
          <View style={styles.rank}>
            <Text style={styles.rankText}>{index + 1}</Text>
          </View>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.quantity}>× {product.quantity}</Text>
        </View>
      ))}
    </SectionCard>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    empty: { ...type.bodyMedium, color: colors.onSurfaceVariant },
    row: { flexDirection: "row", alignItems: "center", gap: 12 },
    rank: {
      width: 28,
      height: 28,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: shape.full,
      backgroundColor: colors.secondaryContainer,
    },
    rankText: { ...type.labelLarge, color: colors.onSecondaryContainer },
    name: { ...type.bodyLarge, flex: 1, color: colors.onSurface },
    quantity: { ...type.labelLarge, color: colors.onSurfaceVariant },
  });
}
