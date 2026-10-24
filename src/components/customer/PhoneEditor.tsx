import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { ThemeColors, type } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { formatPhone } from "@/utils/format";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// Phone numbers are not on driver's licenses, so staff type it in after scanning
type Props = { phone: string; onSave: (phone: string) => void };

export function PhoneEditor({ phone, onSave }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(phone);
  const [error, setError] = useState("");

  function handleSave() {
    const digits = draft.replace(/\D/g, "");
    if (digits.length !== 10) {
      setError("Enter a 10 digit phone number");
      return;
    }
    onSave(digits);
    setError("");
    setEditing(false);
  }

  if (!editing) {
    return (
      <View style={styles.row}>
        <Text style={phone ? styles.value : styles.empty}>{phone ? formatPhone(phone) : "Not added yet"}</Text>
        <Button
          label={phone ? "Edit" : "Add"}
          onPress={() => {
            setDraft(phone);
            setEditing(true);
          }}
          variant="text"
        />
      </View>
    );
  }

  return (
    <View style={styles.editor}>
      <TextField
        autoFocus
        containerStyle={styles.field}
        error={error}
        keyboardType="phone-pad"
        label="Phone number"
        onChangeText={setDraft}
        onSubmitEditing={handleSave}
        placeholder="(555) 123-4567"
        value={draft}
      />
      <View style={styles.actions}>
        <Button label="Cancel" onPress={() => setEditing(false)} variant="text" />
        <Button label="Save" onPress={handleSave} variant="tonal" />
      </View>
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    value: { ...type.bodyLarge, color: colors.onSurface },
    empty: { ...type.bodyLarge, color: colors.onSurfaceVariant, fontStyle: "italic" },
    editor: { marginTop: 12, gap: 8 },
    field: { maxWidth: 320 },
    actions: { flexDirection: "row", gap: 8 },
  });
}
