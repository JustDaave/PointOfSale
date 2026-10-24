import { SectionCard } from "@/components/customer/SectionCard";
import { icons } from "@/constants/icons";
import { shape, ThemeColors, type } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { Order } from "@/types/order";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

const STAMPS_FOR_FREE_DRINK = 10;

// "Cards" from the mockup: a coffee punch card and a reward points card,
// both worked out from the customer's saved orders.
export function LoyaltySection({ orders, style }: { orders: Order[]; style?: StyleProp<ViewStyle> }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  let coffeesBought = 0;
  orders.forEach((order) =>
    order.lines.forEach((line) => {
      if (line.category === "Coffee") coffeesBought += line.quantity;
    }),
  );
  const stamps = coffeesBought % STAMPS_FOR_FREE_DRINK;
  const freeDrinks = Math.floor(coffeesBought / STAMPS_FOR_FREE_DRINK);
  const points = Math.floor(orders.reduce((sum, order) => sum + order.total, 0));

  return (
    <SectionCard icon={icons.loyalty} style={style} title="Cards">
      <View style={styles.punchCard}>
        <Text style={styles.cardTitle}>Coffee card</Text>
        <View style={styles.stamps}>
          {Array.from({ length: STAMPS_FOR_FREE_DRINK }, (_, index) => (
            <View key={index} style={[styles.stamp, index < stamps && styles.stampFilled]} />
          ))}
        </View>
        <Text style={styles.cardText}>
          {STAMPS_FOR_FREE_DRINK - stamps} more for a free coffee
          {freeDrinks > 0 ? ` · ${freeDrinks} earned` : ""}
        </Text>
      </View>
      <View style={styles.pointsCard}>
        <Text style={[styles.cardTitle, styles.pointsText]}>Reward points</Text>
        <Text style={styles.points}>{points}</Text>
        <Text style={[styles.cardText, styles.pointsText]}>1 point for every dollar spent</Text>
      </View>
    </SectionCard>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    punchCard: { padding: 12, gap: 8, borderRadius: shape.medium, backgroundColor: colors.primaryContainer },
    pointsCard: { padding: 12, borderRadius: shape.medium, backgroundColor: colors.tertiaryContainer },
    cardTitle: { ...type.labelLarge, color: colors.onPrimaryContainer },
    cardText: { ...type.bodySmall, color: colors.onPrimaryContainer },
    stamps: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
    stamp: { width: 16, height: 16, borderRadius: 8, borderWidth: 2, borderColor: colors.onPrimaryContainer },
    stampFilled: { backgroundColor: colors.onPrimaryContainer },
    points: { ...type.headlineMedium, color: colors.onTertiaryContainer },
    pointsText: { color: colors.onTertiaryContainer },
  });
}
