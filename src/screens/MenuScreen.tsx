import { AppIcon } from "@/components/AppIcon";
import { CartPanel } from "@/components/menu/CartPanel";
import { CategoryRail } from "@/components/menu/CategoryRail";
import { ProductCard } from "@/components/menu/ProductCard";
import { colors } from "@/constants/theme";
import { categories, menuItems } from "@/data/menu";
import { CartLine, MenuItem } from "@/types/menu";
import { createReceiptHtml } from "@/utils/receipt";
import * as Print from "expo-print";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function MenuScreen() {
  const router = useRouter();
  const { staff } = useLocalSearchParams<{ staff?: string }>();
  const { width } = useWindowDimensions();
  const compact = width < 700;
  const sidebarWidth = width < 1000 ? 160 : 190;
  const cartWidth = width < 1000 ? 280 : 320;
  const [category, setCategory] = useState("Popular");
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");
  const [isPrinting, setIsPrinting] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([
    { ...menuItems[0], quantity: 2 },
    { ...menuItems[2], quantity: 1 },
  ]);

  const visibleItems = useMemo(
    () => menuItems.filter((item) =>
      (category === "Popular" || item.category === category)
      && item.name.toLowerCase().includes(search.trim().toLowerCase()),
    ),
    [category, search],
  );
  const catalogWidth = compact ? width - 40 : width - sidebarWidth - cartWidth - 44;
  const columns = compact ? (width >= 680 ? 3 : 2) : catalogWidth >= 620 ? 3 : 2;
  const cardWidth = Math.floor((catalogWidth - (columns - 1) * 14) / columns);

  function addItem(item: MenuItem) {
    setCart((current) => {
      const found = current.find((line) => line.id === item.id);
      return found
        ? current.map((line) => line.id === item.id ? { ...line, quantity: line.quantity + 1 } : line)
        : [...current, { ...item, quantity: 1 }];
    });
  }

  function changeQuantity(id: string, delta: number) {
    setCart((current) => current
      .map((line) => line.id === id ? { ...line, quantity: line.quantity + delta } : line)
      .filter((line) => line.quantity > 0));
  }

  async function completeOrder() {
    if (isPrinting || cart.length === 0) return;

    setIsPrinting(true);
    try {
      await Print.printAsync({ html: createReceiptHtml(cart, staff || "Staff") });
      setCart([]);
      setNotice("Payment accepted — receipt sent to printer.");
    } catch {
      Alert.alert("Receipt not printed", "The order is still open. Try printing again when a printer is available.");
    } finally {
      setIsPrinting(false);
    }
  }

  const catalog = (
    <View style={[styles.catalog, compact && styles.catalogCompact]}>
      <View style={styles.catalogHeader}>
        <View><Text style={styles.eyebrow}>MENU</Text><Text style={styles.heading}>{category}</Text></View>
        <View style={styles.search}>
          <AppIcon name={{ ios: "magnifyingglass", android: "search", web: "search" }} color={colors.inkMuted} size={18} />
          <TextInput
            accessibilityLabel="Search menu"
            onChangeText={setSearch}
            placeholder="Search menu"
            placeholderTextColor={colors.inkMuted}
            style={styles.searchInput}
            value={search}
          />
          {search.length > 0 && <Pressable accessibilityLabel="Clear search" onPress={() => setSearch("")}><AppIcon name={{ ios: "xmark.circle.fill", android: "cancel", web: "cancel" }} color={colors.inkMuted} size={17} /></Pressable>}
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.products}>
        {visibleItems.map((item) => <ProductCard key={item.id} item={item} width={cardWidth} onAdd={addItem} />)}
        {visibleItems.length === 0 && <Text style={styles.noResults}>No menu items match “{search}”.</Text>}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topBar}>
        <View style={styles.brandRow}><View style={styles.logo}><AppIcon name={{ ios: "storefront.fill", android: "storefront", web: "storefront" }} color={colors.surface} size={18} /></View><Text style={styles.brand}>Dave's Coffee Shop</Text></View>
        <View style={styles.shiftInfo}><View style={styles.liveDot} /><Text style={styles.shiftText}>Register open · {staff || "Staff"}</Text><Pressable onPress={() => router.replace("/")} style={styles.exit}><AppIcon name={{ ios: "rectangle.portrait.and.arrow.right", android: "logout", web: "logout" }} color={colors.ink} size={16} /><Text style={styles.exitText}>Sign out</Text></Pressable></View>
      </View>
      {notice ? <View style={styles.notice}><AppIcon name={{ ios: "checkmark.circle.fill", android: "check_circle", web: "check_circle" }} color={colors.surface} size={19} /><Text style={styles.noticeText}>{notice}</Text><Pressable accessibilityLabel="Dismiss message" onPress={() => setNotice("")}><AppIcon name={{ ios: "xmark", android: "close", web: "close" }} color={colors.surface} size={17} /></Pressable></View> : null}
      {compact ? (
        <ScrollView style={styles.compactPage} contentContainerStyle={styles.compactPageContent}>
          <CategoryRail categories={categories} selected={category} horizontal onSelect={setCategory} />
          {catalog}
          <View style={styles.compactCart}><CartPanel isPrinting={isPrinting} lines={cart} onChangeQuantity={changeQuantity} onCheckout={completeOrder} /></View>
        </ScrollView>
      ) : (
        <View style={styles.workspace}>
          <View style={[styles.sidebar, { width: sidebarWidth }]}><Text style={styles.sidebarLabel}>CATEGORIES</Text><CategoryRail categories={categories} selected={category} onSelect={setCategory} /></View>
          {catalog}
          <View style={[styles.cart, { width: cartWidth }]}><CartPanel isPrinting={isPrinting} lines={cart} onChangeQuantity={changeQuantity} onCheckout={completeOrder} /></View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  topBar: { height: 66, paddingHorizontal: 22, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: colors.border, backgroundColor: colors.surface },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 9 }, logo: { width: 34, height: 34, alignItems: "center", justifyContent: "center", borderRadius: 11, backgroundColor: colors.primary }, brand: { color: colors.ink, fontSize: 16, fontWeight: "800" },
  shiftInfo: { flexDirection: "row", alignItems: "center", gap: 8 }, liveDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: "#58A273" }, shiftText: { color: colors.inkMuted, fontSize: 12 },
  exit: { marginLeft: 10, paddingHorizontal: 13, paddingVertical: 9, flexDirection: "row", alignItems: "center", gap: 6, borderRadius: 10, backgroundColor: colors.surfaceMuted }, exitText: { color: colors.ink, fontSize: 12, fontWeight: "700" },
  notice: { minHeight: 44, paddingHorizontal: 20, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 9, backgroundColor: colors.primary },
  noticeText: { flex: 1, color: colors.surface, fontSize: 13, fontWeight: "700", textAlign: "center" },
  workspace: { flex: 1, flexDirection: "row" },
  sidebar: { padding: 12, borderRightWidth: 1, borderRightColor: colors.border, backgroundColor: colors.surface }, sidebarLabel: { color: colors.inkMuted, fontSize: 10, fontWeight: "800", letterSpacing: 1.2, marginBottom: 14, marginLeft: 8 },
  catalog: { flex: 1, paddingHorizontal: 22, paddingTop: 22 }, catalogCompact: { paddingHorizontal: 20, height: 500 },
  catalogHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }, eyebrow: { color: colors.primary, fontSize: 10, fontWeight: "800", letterSpacing: 1.2 }, heading: { color: colors.ink, fontSize: 26, fontWeight: "800", marginTop: 3 },
  search: { width: 190, height: 40, paddingHorizontal: 12, flexDirection: "row", alignItems: "center", gap: 8, borderRadius: 12, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  searchInput: { flex: 1, paddingVertical: 0, color: colors.ink, fontSize: 13 },
  products: { flexDirection: "row", flexWrap: "wrap", gap: 14, paddingBottom: 24 },
  noResults: { width: "100%", paddingVertical: 50, color: colors.inkMuted, fontSize: 14, textAlign: "center" },
  cart: { borderLeftWidth: 1, borderLeftColor: colors.border },
  compactPage: { flex: 1 }, compactPageContent: { paddingTop: 16, paddingBottom: 24 }, compactCart: { height: 560, marginHorizontal: 20, marginTop: 8, overflow: "hidden", borderWidth: 1, borderColor: colors.border, borderRadius: 20 },
});
