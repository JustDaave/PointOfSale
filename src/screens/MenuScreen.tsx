import { AppHeader } from "@/components/AppHeader";
import { CartPanel } from "@/components/menu/CartPanel";
import { CategoryChips } from "@/components/menu/CategoryChips";
import { CategoryRail } from "@/components/menu/CategoryRail";
import { OrderSummaryBar } from "@/components/menu/OrderSummaryBar";
import { ProductGrid } from "@/components/menu/ProductGrid";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { Snackbar } from "@/components/ui/Snackbar";
import { TextField } from "@/components/ui/TextField";
import { icons } from "@/constants/icons";
import { breakpoints, ThemeColors, type } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { useOrder } from "@/context/OrderContext";
import { useTheme } from "@/context/ThemeContext";
import { categories, menuItems } from "@/data/menu";
import { MenuItem } from "@/types/menu";
import { formatMoney } from "@/utils/format";
import { calculateTotals, countItemsSold, createOrder, sortByPopularity } from "@/utils/orders";
import { createReceiptHtml } from "@/utils/receipt";
import * as Haptics from "expo-haptics";
import * as Print from "expo-print";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function MenuScreen() {
  const { colors } = useTheme();
  const { staff } = useAuth();
  const { cart, customer, orders, addItem, finishOrder } = useOrder();
  const { width } = useWindowDimensions();
  const styles = createStyles(colors);

  // Tablets get the three column layout from Frame 1, phones get the Mobile mockup
  const isTablet = width >= breakpoints.expanded;

  const [category, setCategory] = useState("Popular");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSheetOpen, setOrderSheetOpen] = useState(false);

  // Close the order sheet when leaving this screen (for example to scan an ID)
  useFocusEffect(
    useCallback(() => {
      return () => setOrderSheetOpen(false);
    }, []),
  );

  // Best sellers come first, based on the orders saved on this device
  const soldCounts = countItemsSold(orders);
  const visibleItems = sortByPopularity(menuItems, soldCounts).filter(
    (item) =>
      (category === "Popular" || item.category === category) &&
      item.name.toLowerCase().includes(search.trim().toLowerCase()),
  );
  const { total, itemCount } = calculateTotals(cart);

  function handleAdd(item: MenuItem) {
    addItem(item);
    Haptics.selectionAsync();
  }

  async function handleCheckout() {
    if (!staff || isCheckingOut || cart.length === 0) return;

    setIsCheckingOut(true);
    const order = createOrder(cart, customer, staff.name);
    try {
      await Print.printAsync({ html: createReceiptHtml(order) });
      await finishOrder(order);
      setOrderSheetOpen(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setMessage(`Order #${order.number} sent · ${formatMoney(order.total)}`);
    } catch {
      setMessage("Receipt not printed. The order is still open, try again.");
    } finally {
      setIsCheckingOut(false);
    }
  }

  if (isTablet) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <AppHeader current="menu" />
        <View style={styles.workspace}>
          <View style={styles.sidebar}>
            <CategoryRail categories={categories} onSelect={setCategory} selected={category} />
          </View>
          <View style={styles.catalog}>
            <ProductGrid
              emptyMessage={`No menu items match “${search}”.`}
              header={
                <View style={styles.catalogHeader}>
                  <Text style={styles.heading}>{category}</Text>
                  <TextField
                    containerStyle={styles.search}
                    icon={icons.search}
                    label="Search menu"
                    onChangeText={setSearch}
                    value={search}
                  />
                </View>
              }
              items={visibleItems}
              onAdd={handleAdd}
              soldCounts={soldCounts}
            />
          </View>
          <View style={styles.cart}>
            <CartPanel isCheckingOut={isCheckingOut} onCheckout={handleCheckout} />
          </View>
        </View>
        <Snackbar message={message} onDismiss={() => setMessage("")} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.safeArea}>
      <AppHeader current="menu" />
      <CategoryChips categories={categories} onSelect={setCategory} selected={category} />
      <View style={styles.flex}>
        <ProductGrid emptyMessage="Nothing in this category yet." items={visibleItems} onAdd={handleAdd} soldCounts={soldCounts} />
        <Snackbar message={message} onDismiss={() => setMessage("")} />
      </View>
      <OrderSummaryBar
        itemCount={itemCount}
        onOpenOrder={() => setOrderSheetOpen(true)}
        onSend={handleCheckout}
        sending={isCheckingOut}
        total={total}
      />
      <BottomSheet onClose={() => setOrderSheetOpen(false)} visible={orderSheetOpen}>
        <CartPanel isCheckingOut={isCheckingOut} onCheckout={handleCheckout} />
      </BottomSheet>
    </SafeAreaView>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.surface },
    flex: { flex: 1 },
    workspace: { flex: 1, flexDirection: "row" },
    sidebar: { width: 200, backgroundColor: colors.surfaceContainerLow },
    catalog: { flex: 1 },
    catalogHeader: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      marginBottom: 20,
      paddingTop: 8,
    },
    heading: { ...type.headlineMedium, color: colors.onSurface },
    search: { width: 240 },
    cart: { width: 340, borderLeftWidth: 1, borderLeftColor: colors.outlineVariant },
  });
}
