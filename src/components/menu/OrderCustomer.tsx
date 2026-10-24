import { CustomerAvatar } from "@/components/customer/CustomerAvatar";
import { IdStatusBadges } from "@/components/customer/IdStatusBadges";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { icons } from "@/constants/icons";
import { shape, ThemeColors, type } from "@/constants/theme";
import { useOrder } from "@/context/OrderContext";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

// Shows who the order is for, or buttons to scan / pick a customer
export function OrderCustomer() {
  const { colors } = useTheme();
  const { customer, setCustomer } = useOrder();
  const router = useRouter();
  const styles = createStyles(colors);

  if (!customer) {
    return (
      <View style={styles.buttons}>
        <Button icon={icons.scan} label="Scan ID" onPress={() => router.push("/scan")} style={styles.flex} variant="tonal" />
        <Button label="Find customer" onPress={() => router.push("/customers")} style={styles.flex} variant="outlined" />
      </View>
    );
  }

  return (
    <View style={styles.customer}>
      <CustomerAvatar customer={customer} />
      <View style={styles.flex}>
        <Text numberOfLines={1} style={styles.name}>
          {customer.firstName} {customer.lastName}
        </Text>
        <IdStatusBadges customer={customer} />
      </View>
      <IconButton icon={icons.close} label="Remove customer from order" onPress={() => setCustomer(null)} />
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    buttons: { flexDirection: "row", gap: 8 },
    flex: { flex: 1 },
    customer: {
      padding: 12,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      borderRadius: shape.medium,
      backgroundColor: colors.surfaceContainerHighest,
    },
    name: { ...type.titleSmall, color: colors.onSurface, marginBottom: 4 },
  });
}
