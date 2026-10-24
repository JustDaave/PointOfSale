import { AppHeader } from "@/components/AppHeader";
import { AppIcon } from "@/components/AppIcon";
import { OrderCard } from "@/components/orders/OrderCard";
import { StatCard } from "@/components/orders/StatCard";
import { Chip } from "@/components/ui/Chip";
import { icons } from "@/constants/icons";
import { ThemeColors, type } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { useOrder } from "@/context/OrderContext";
import { useTheme } from "@/context/ThemeContext";
import { Order } from "@/types/order";
import { formatMoney } from "@/utils/format";
import { createReceiptHtml } from "@/utils/receipt";
import * as Print from "expo-print";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// "Checks" page: every order saved on this device, newest first
export function OrdersScreen() {
  const { colors } = useTheme();
  const { staff } = useAuth();
  const { orders } = useOrder();
  const styles = createStyles(colors);
  const [onlyMine, setOnlyMine] = useState(false);

  const today = new Date().toDateString();
  const todaysOrders = orders.filter((order) => new Date(order.createdAt).toDateString() === today);
  const todaysSales = todaysOrders.reduce((sum, order) => sum + order.total, 0);
  const visibleOrders = onlyMine ? orders.filter((order) => order.staffName === staff?.name) : orders;

  async function handleReprint(order: Order) {
    try {
      await Print.printAsync({ html: createReceiptHtml(order) });
    } catch (error) {
      console.warn("Reprint failed", error);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader current="orders" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Checks</Text>
        <View style={styles.stats}>
          <StatCard label="Sales today" value={formatMoney(todaysSales)} />
          <StatCard label="Orders today" value={String(todaysOrders.length)} />
          <StatCard label="All saved orders" value={String(orders.length)} />
        </View>

        <View style={styles.filters}>
          <Chip label="All orders" onPress={() => setOnlyMine(false)} selected={!onlyMine} />
          <Chip label={`Served by ${staff?.name}`} onPress={() => setOnlyMine(true)} selected={onlyMine} />
        </View>

        {visibleOrders.length === 0 ? (
          <View style={styles.empty}>
            <AppIcon name={icons.orders} color={colors.primary} size={48} />
            <Text style={styles.emptyTitle}>No orders yet</Text>
            <Text style={styles.emptyText}>Completed orders are saved here, even after the app is closed.</Text>
          </View>
        ) : (
          visibleOrders.map((order) => <OrderCard key={order.id} onReprint={handleReprint} order={order} />)
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.surface },
    content: { width: "100%", maxWidth: 900, alignSelf: "center", padding: 16, paddingBottom: 32, gap: 12 },
    heading: { ...type.headlineMedium, color: colors.onSurface },
    stats: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
    filters: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 8 },
    empty: { alignItems: "center", paddingVertical: 64, gap: 8 },
    emptyTitle: { ...type.titleLarge, color: colors.onSurface },
    emptyText: { ...type.bodyMedium, color: colors.onSurfaceVariant, textAlign: "center" },
  });
}
