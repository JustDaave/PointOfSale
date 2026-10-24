import { Button } from "@/components/ui/Button";
import { shape, ThemeColors, type } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

// Material 3 basic dialog https://m3.material.io/components/dialogs
// Used to confirm actions that can't be undone, like deleting a customer.
type Props = {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function Dialog({ visible, title, message, confirmLabel, onConfirm, onCancel }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <Modal animationType="fade" onRequestClose={onCancel} transparent visible={visible}>
      <Pressable accessibilityLabel="Close dialog" onPress={onCancel} style={styles.scrim}>
        {/* Stop taps inside the dialog from closing it */}
        <Pressable style={styles.dialog} onPress={() => {}}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.actions}>
            <Button label="Cancel" onPress={onCancel} variant="text" />
            <Button label={confirmLabel} onPress={onConfirm} variant="text" />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    scrim: { flex: 1, padding: 24, alignItems: "center", justifyContent: "center", backgroundColor: colors.scrim + "52" },
    dialog: { width: "100%", maxWidth: 400, padding: 24, borderRadius: shape.extraLarge, backgroundColor: colors.surfaceContainerHigh },
    title: { ...type.headlineSmall, color: colors.onSurface },
    message: { ...type.bodyMedium, color: colors.onSurfaceVariant, marginTop: 16 },
    actions: { flexDirection: "row", justifyContent: "flex-end", gap: 8, marginTop: 24 },
  });
}
