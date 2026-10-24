import { shape, ThemeColors } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { ReactNode } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Material 3 modal bottom sheet https://m3.material.io/components/bottom-sheets
type Props = {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function BottomSheet({ visible, onClose, children }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const insets = useSafeAreaInsets();

  return (
    <Modal animationType="slide" onRequestClose={onClose} transparent visible={visible}>
      <View style={styles.container}>
        <Pressable accessibilityLabel="Close sheet" accessibilityRole="button" onPress={onClose} style={styles.scrim} />
        <View style={[styles.sheet, { paddingBottom: insets.bottom }]}>
          <View style={styles.handle} />
          {children}
        </View>
      </View>
    </Modal>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    container: { flex: 1, justifyContent: "flex-end" },
    scrim: { ...StyleSheet.absoluteFill, backgroundColor: colors.scrim + "52" },
    sheet: {
      height: "85%",
      overflow: "hidden",
      borderTopLeftRadius: shape.extraLarge,
      borderTopRightRadius: shape.extraLarge,
      backgroundColor: colors.surfaceContainerLow,
    },
    handle: {
      width: 32,
      height: 4,
      alignSelf: "center",
      marginTop: 16,
      marginBottom: 6,
      borderRadius: 2,
      backgroundColor: colors.onSurfaceVariant + "66",
    },
  });
}
