import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { icons } from "@/constants/icons";
import { ThemeColors, type } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { ScannedId } from "@/types/customer";
import { parseDateInput } from "@/utils/format";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// Backup for when the barcode can't be read (or there's no camera, like on a simulator)
type Props = { onSubmit: (id: ScannedId, phone: string) => void; saving: boolean };

type Errors = Partial<Record<"firstName" | "lastName" | "birthDate" | "expiryDate" | "phone", string>>;

export function ManualEntryForm({ onSubmit, saving }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  function handleSubmit() {
    const birth = parseDateInput(birthDate);
    const expiry = parseDateInput(expiryDate);
    const phoneDigits = phone.replace(/\D/g, "");

    const newErrors: Errors = {};
    if (!firstName.trim()) newErrors.firstName = "Required";
    if (!lastName.trim()) newErrors.lastName = "Required";
    if (!birth) newErrors.birthDate = "Use MM/DD/YYYY";
    else if (new Date(birth) > new Date()) newErrors.birthDate = "Birth date can't be in the future";
    if (!expiry) newErrors.expiryDate = "Use MM/DD/YYYY";
    if (phoneDigits && phoneDigits.length !== 10) newErrors.phone = "Enter 10 digits or leave empty";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0 || !birth || !expiry) return;

    onSubmit(
      {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        birthDate: birth,
        expiryDate: expiry,
        idLast4: "",
        state: "",
      },
      phoneDigits,
    );
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Enter ID details</Text>
      <Text style={styles.subtitle}>Type the information printed on the front of the ID.</Text>
      <View style={styles.row}>
        <TextField
          autoCapitalize="words"
          containerStyle={styles.half}
          error={errors.firstName}
          label="First name"
          onChangeText={setFirstName}
          value={firstName}
        />
        <TextField
          autoCapitalize="words"
          containerStyle={styles.half}
          error={errors.lastName}
          label="Last name"
          onChangeText={setLastName}
          value={lastName}
        />
      </View>
      <View style={styles.row}>
        <TextField
          containerStyle={styles.half}
          error={errors.birthDate}
          keyboardType="numbers-and-punctuation"
          label="Birth date"
          onChangeText={setBirthDate}
          placeholder="MM/DD/YYYY"
          value={birthDate}
        />
        <TextField
          containerStyle={styles.half}
          error={errors.expiryDate}
          keyboardType="numbers-and-punctuation"
          label="Expiration date"
          onChangeText={setExpiryDate}
          placeholder="MM/DD/YYYY"
          value={expiryDate}
        />
      </View>
      <TextField
        error={errors.phone}
        helperText="Optional"
        icon={icons.phone}
        keyboardType="phone-pad"
        label="Phone number"
        onChangeText={setPhone}
        value={phone}
      />
      <Button disabled={saving} icon={icons.check} label={saving ? "Saving…" : "Save customer"} onPress={handleSubmit} />
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    form: { width: "100%", maxWidth: 560, alignSelf: "center", gap: 20, padding: 24 },
    title: { ...type.headlineSmall, color: colors.onSurface },
    subtitle: { ...type.bodyMedium, color: colors.onSurfaceVariant, marginTop: -12 },
    row: { flexDirection: "row", flexWrap: "wrap", gap: 16 },
    half: { flexGrow: 1, flexBasis: 200 },
  });
}
