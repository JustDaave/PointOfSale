import { FavoritesSection } from "@/components/customer/FavoritesSection";
import { IdPhoto } from "@/components/customer/IdPhoto";
import { IdStatusBadges } from "@/components/customer/IdStatusBadges";
import { InfoRow } from "@/components/customer/InfoRow";
import { LoyaltySection } from "@/components/customer/LoyaltySection";
import { PhoneEditor } from "@/components/customer/PhoneEditor";
import { VisitsSection } from "@/components/customer/VisitsSection";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { IconButton } from "@/components/ui/IconButton";
import { TopAppBar } from "@/components/ui/TopAppBar";
import { icons } from "@/constants/icons";
import { breakpoints, ThemeColors, type } from "@/constants/theme";
import { useOrder } from "@/context/OrderContext";
import { useTheme } from "@/context/ThemeContext";
import { Customer } from "@/types/customer";
import { formatDate, getAge, isExpired } from "@/utils/format";
import { deleteIdPhoto } from "@/utils/photo";
import { deleteCustomer, getCustomer, saveCustomer } from "@/utils/storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// "Identification Results" screen from Frame 3
export function CustomerScreen() {
  const { colors } = useTheme();
  const { orders, customer: orderCustomer, setCustomer: setOrderCustomer } = useOrder();
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const styles = createStyles(colors);
  const isWide = width >= breakpoints.medium;

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    getCustomer(id).then((saved) => {
      setCustomer(saved);
      setLoading(false);
    });
  }, [id]);

  function goBack() {
    if (router.canGoBack()) router.back();
    else router.replace("/customers");
  }

  async function handleSavePhone(phone: string) {
    if (!customer) return;
    const updated = { ...customer, phone };
    setCustomer(updated);
    await saveCustomer(updated);
  }

  async function handleDelete() {
    if (!customer) return;
    setConfirmDelete(false);
    await deleteCustomer(customer.id);
    deleteIdPhoto(customer.photoUri);
    if (orderCustomer?.id === customer.id) setOrderCustomer(null);
    goBack();
  }

  function handleStartOrder() {
    if (!customer) return;
    setOrderCustomer(customer);
    // Go back to the register that is already open instead of opening a second one
    router.dismissTo("/menu");
  }

  if (loading || !customer) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <TopAppBar onBack={goBack} title="Identification Results" />
        <View style={styles.center}>
          {loading ? <ActivityIndicator color={colors.primary} /> : <Text style={styles.missing}>Customer not found.</Text>}
        </View>
      </SafeAreaView>
    );
  }

  const customerOrders = orders.filter((order) => order.customerId === customer.id);
  const expired = isExpired(customer.expiryDate);
  const fullName = `${customer.firstName} ${customer.lastName}`;

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopAppBar
        actions={<IconButton icon={icons.delete} label="Delete customer" onPress={() => setConfirmDelete(true)} />}
        onBack={goBack}
        title="Identification Results"
      />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.top, isWide && styles.topWide]}>
          <IdPhoto style={isWide ? styles.photoWide : null} uri={customer.photoUri} />
          <View style={styles.details}>
            <InfoRow icon={icons.person} label="Name" value={fullName} />
            <InfoRow icon={icons.phone} label="Phone Number">
              <PhoneEditor onSave={handleSavePhone} phone={customer.phone} />
            </InfoRow>
            <InfoRow
              icon={icons.birthday}
              label="Birth Date"
              value={`${formatDate(customer.birthDate)} · Age ${getAge(customer.birthDate)}`}
            />
            <InfoRow icon={icons.valid} label="Validity">
              <Text style={[styles.validity, expired && styles.expired]}>
                {expired ? "Expired" : "Valid until"} {formatDate(customer.expiryDate)}
              </Text>
              <IdStatusBadges customer={customer} />
            </InfoRow>
            {customer.idLast4 ? (
              <Text style={styles.idNumber}>
                {customer.state ? `${customer.state} · ` : ""}ID ending in {customer.idLast4}
              </Text>
            ) : null}
          </View>
        </View>

        <Button
          disabled={orderCustomer?.id === customer.id}
          icon={icons.cart}
          label={orderCustomer?.id === customer.id ? "Already on the current order" : `Start order for ${customer.firstName}`}
          large
          onPress={handleStartOrder}
          style={styles.startButton}
        />

        <View style={[styles.sections, isWide && styles.sectionsWide]}>
          <LoyaltySection orders={customerOrders} style={styles.section} />
          <VisitsSection orders={customerOrders} style={styles.section} />
          <FavoritesSection orders={customerOrders} style={styles.section} />
        </View>
      </ScrollView>

      <Dialog
        confirmLabel="Delete"
        message={`${fullName} and their ID photo will be removed from this device. Past orders are kept.`}
        onCancel={() => setConfirmDelete(false)}
        onConfirm={handleDelete}
        title="Delete customer?"
        visible={confirmDelete}
      />
    </SafeAreaView>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.surface },
    center: { flex: 1, alignItems: "center", justifyContent: "center" },
    missing: { ...type.bodyLarge, color: colors.onSurfaceVariant },
    content: { width: "100%", maxWidth: 1100, alignSelf: "center", padding: 16, paddingBottom: 32, gap: 24 },
    top: { gap: 16 },
    topWide: { flexDirection: "row", alignItems: "flex-start", gap: 32 },
    photoWide: { width: "40%", maxWidth: 400 },
    details: { flex: 1 },
    validity: { ...type.bodyLarge, color: colors.onSurface, marginBottom: 4 },
    expired: { color: colors.error },
    idNumber: { ...type.bodySmall, color: colors.onSurfaceVariant, marginLeft: 38 },
    startButton: { alignSelf: "flex-start" },
    sections: { gap: 16 },
    sectionsWide: { flexDirection: "row", alignItems: "flex-start" },
    section: { flex: 1 },
  });
}
