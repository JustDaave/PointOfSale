import { ThemeColors, type } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { Customer } from "@/types/customer";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

// Round picture of the customer. Uses their ID photo if we have one, otherwise their initials.
export function CustomerAvatar({ customer, size = 40 }: { customer: Customer; size?: number }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const circle = { width: size, height: size, borderRadius: size / 2 };

  if (customer.photoUri) {
    return <Image contentFit="cover" source={{ uri: customer.photoUri }} style={[styles.photo, circle]} />;
  }

  return (
    <View style={[styles.initials, circle]}>
      <Text style={styles.initialsText}>
        {customer.firstName.charAt(0)}
        {customer.lastName.charAt(0)}
      </Text>
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    photo: { backgroundColor: colors.surfaceContainerHighest },
    initials: { alignItems: "center", justifyContent: "center", backgroundColor: colors.tertiaryContainer },
    initialsText: { ...type.titleSmall, color: colors.onTertiaryContainer },
  });
}
