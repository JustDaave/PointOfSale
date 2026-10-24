import { AppHeader } from "@/components/AppHeader";
import { AppIcon } from "@/components/AppIcon";
import { CustomerListItem } from "@/components/customer/CustomerListItem";
import { Fab } from "@/components/ui/Fab";
import { TextField } from "@/components/ui/TextField";
import { icons } from "@/constants/icons";
import { ThemeColors, type } from "@/constants/theme";
import { useOrder } from "@/context/OrderContext";
import { useTheme } from "@/context/ThemeContext";
import { Customer } from "@/types/customer";
import { loadCustomers } from "@/utils/storage";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function CustomersScreen() {
  const { colors } = useTheme();
  const { orders } = useOrder();
  const router = useRouter();
  const styles = createStyles(colors);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");

  // Reload every time the screen opens so new scans show up
  useFocusEffect(
    useCallback(() => {
      loadCustomers().then(setCustomers);
    }, []),
  );

  const query = search.trim().toLowerCase();
  const visibleCustomers = customers.filter((customer) =>
    `${customer.firstName} ${customer.lastName} ${customer.phone}`.toLowerCase().includes(query),
  );

  function countVisits(customerId: string) {
    return orders.filter((order) => order.customerId === customerId).length;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader current="customers" />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.heading}>Customers</Text>
        <TextField icon={icons.search} label="Search by name or phone" onChangeText={setSearch} value={search} />

        {customers.length === 0 ? (
          <View style={styles.empty}>
            <AppIcon name={icons.idCard} color={colors.primary} size={48} />
            <Text style={styles.emptyTitle}>No customers yet</Text>
            <Text style={styles.emptyText}>Scan a customer's ID to save them and track their visits.</Text>
          </View>
        ) : (
          visibleCustomers.map((customer) => (
            <CustomerListItem
              customer={customer}
              key={customer.id}
              onPress={() => router.push({ pathname: "/customers/[id]", params: { id: customer.id } })}
              visits={countVisits(customer.id)}
            />
          ))
        )}
        {customers.length > 0 && visibleCustomers.length === 0 && (
          <Text style={styles.emptyText}>No customers match “{search}”.</Text>
        )}
      </ScrollView>
      <Fab icon={icons.scan} label="Scan ID" onPress={() => router.push("/scan")} style={styles.fab} />
    </SafeAreaView>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.surface },
    content: { width: "100%", maxWidth: 800, alignSelf: "center", padding: 16, paddingBottom: 104, gap: 12 },
    heading: { ...type.headlineMedium, color: colors.onSurface, marginBottom: 8 },
    empty: { alignItems: "center", paddingVertical: 64, gap: 8 },
    emptyTitle: { ...type.titleLarge, color: colors.onSurface },
    emptyText: { ...type.bodyMedium, color: colors.onSurfaceVariant, textAlign: "center" },
    fab: { position: "absolute", right: 16, bottom: 32 },
  });
}
