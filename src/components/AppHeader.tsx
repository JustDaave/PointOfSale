import { AppIcon } from "@/components/AppIcon";
import { IconButton } from "@/components/ui/IconButton";
import { SegmentedButtons } from "@/components/ui/SegmentedButtons";
import { icons } from "@/constants/icons";
import { breakpoints, shape, ThemeColors, type } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { useOrder } from "@/context/OrderContext";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "expo-router";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

type Page = "menu" | "orders" | "customers";

const pages: { value: Page; label: string; path: "/menu" | "/orders" | "/customers" }[] = [
  { value: "menu", label: "Menu", path: "/menu" },
  { value: "orders", label: "Checks", path: "/orders" },
  { value: "customers", label: "Customers", path: "/customers" },
];

// Header shown on the main screens. Tablets get segmented buttons to switch
// between pages (like the Table / Menu / Checks mockup), phones get icon buttons.
export function AppHeader({ current }: { current: Page }) {
  const { colors, isDark, toggleTheme } = useTheme();
  const { staff, signOut } = useAuth();
  const { clearOrder } = useOrder();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const styles = createStyles(colors);
  const isPhone = width < breakpoints.medium;

  function goTo(page: Page) {
    const target = pages.find((item) => item.value === page);
    if (target && page !== current) router.replace(target.path);
  }

  function handleSignOut() {
    clearOrder();
    // The protected routes in _layout.tsx send us back to the login screen
    signOut();
  }

  const themeButton = (
    <IconButton
      icon={isDark ? icons.lightMode : icons.darkMode}
      label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onPress={toggleTheme}
    />
  );
  const signOutButton = <IconButton icon={icons.signOut} label="Sign out" onPress={handleSignOut} />;

  if (isPhone) {
    return (
      <View style={styles.bar}>
        <Text numberOfLines={1} style={styles.phoneTitle}>
          {pages.find((page) => page.value === current)?.label}
        </Text>
        <IconButton icon={icons.store} label="Menu" onPress={() => goTo("menu")} />
        <IconButton icon={icons.orders} label="Checks" onPress={() => goTo("orders")} />
        <IconButton icon={icons.customers} label="Customers" onPress={() => goTo("customers")} />
        {themeButton}
        {signOutButton}
      </View>
    );
  }

  return (
    <View style={styles.bar}>
      <View style={styles.brandRow}>
        <View style={styles.logo}>
          <AppIcon name={icons.store} color={colors.onPrimary} size={20} />
        </View>
        {width >= breakpoints.expanded && <Text style={styles.brand}>Dave's Coffee Shop</Text>}
      </View>
      <View style={styles.nav}>
        <SegmentedButtons options={pages} selected={current} onChange={goTo} />
      </View>
      <View style={styles.right}>
        {width >= breakpoints.expanded && (
          <View style={styles.staffChip}>
            <AppIcon name={icons.person} color={colors.onSurfaceVariant} size={16} />
            <Text style={styles.staffText}>{staff?.name}</Text>
          </View>
        )}
        {themeButton}
        {signOutButton}
      </View>
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    bar: {
      height: 64,
      paddingHorizontal: 16,
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      borderBottomWidth: 1,
      borderBottomColor: colors.outlineVariant,
      backgroundColor: colors.surface,
    },
    phoneTitle: { ...type.titleLarge, flex: 1, color: colors.onSurface },
    brandRow: { flex: 1, flexDirection: "row", alignItems: "center", gap: 12 },
    logo: {
      width: 36,
      height: 36,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: shape.medium,
      backgroundColor: colors.primary,
    },
    brand: { ...type.titleMedium, color: colors.onSurface },
    nav: { width: 380 },
    right: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "flex-end", gap: 4 },
    staffChip: {
      height: 32,
      paddingHorizontal: 12,
      marginRight: 4,
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      borderRadius: shape.small,
      backgroundColor: colors.surfaceContainerHigh,
    },
    staffText: { ...type.labelLarge, color: colors.onSurfaceVariant },
  });
}
