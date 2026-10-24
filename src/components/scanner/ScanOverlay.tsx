import { shape, type } from "@/constants/theme";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

// Drawn on top of the camera preview to show where to hold the ID
export function ScanOverlay({ message, busy }: { message: string; busy: boolean }) {
  return (
    <View pointerEvents="none" style={styles.overlay}>
      <View style={styles.frame}>
        {/* The four corner brackets */}
        <View style={[styles.corner, styles.topLeft]} />
        <View style={[styles.corner, styles.topRight]} />
        <View style={[styles.corner, styles.bottomLeft]} />
        <View style={[styles.corner, styles.bottomRight]} />
        {busy && <ActivityIndicator color="#FFFFFF" size="large" />}
      </View>
      <View style={styles.messageBox}>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

// The camera is always dark, so these colors stay the same in light and dark theme
const styles = StyleSheet.create({
  overlay: { ...StyleSheet.absoluteFill, alignItems: "center", justifyContent: "center", gap: 24, padding: 24 },
  frame: { width: "90%", maxWidth: 520, aspectRatio: 1.58, alignItems: "center", justifyContent: "center" },
  corner: { position: "absolute", width: 36, height: 36, borderColor: "#FFFFFF" },
  topLeft: { top: 0, left: 0, borderTopWidth: 4, borderLeftWidth: 4, borderTopLeftRadius: shape.medium },
  topRight: { top: 0, right: 0, borderTopWidth: 4, borderRightWidth: 4, borderTopRightRadius: shape.medium },
  bottomLeft: { bottom: 0, left: 0, borderBottomWidth: 4, borderLeftWidth: 4, borderBottomLeftRadius: shape.medium },
  bottomRight: { bottom: 0, right: 0, borderBottomWidth: 4, borderRightWidth: 4, borderBottomRightRadius: shape.medium },
  messageBox: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: shape.full, backgroundColor: "rgba(0, 0, 0, 0.6)" },
  message: { ...type.bodyMedium, color: "#FFFFFF", textAlign: "center" },
});
