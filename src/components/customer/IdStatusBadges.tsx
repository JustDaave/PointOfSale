import { Badge } from "@/components/ui/Badge";
import { icons } from "@/constants/icons";
import { Customer } from "@/types/customer";
import { getAge, isExpired } from "@/utils/format";
import { StyleSheet, View } from "react-native";

// Shows if the ID is still valid and if the customer is old enough for age restricted items
export function IdStatusBadges({ customer }: { customer: Customer }) {
  const expired = isExpired(customer.expiryDate);
  const over21 = getAge(customer.birthDate) >= 21;

  return (
    <View style={styles.row}>
      <Badge
        icon={expired ? icons.warning : icons.valid}
        label={expired ? "Expired ID" : "Valid ID"}
        tone={expired ? "bad" : "good"}
      />
      <Badge label={over21 ? "21+" : "Under 21"} tone={over21 ? "neutral" : "bad"} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
});
