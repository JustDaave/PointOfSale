import { elevation, shape, ThemeColors, type } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { useEffect } from "react";
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

// Material 3 snackbar https://m3.material.io/components/snackbar
// Shows a short message at the bottom of the screen and hides itself after 4 seconds.
type Props = {
  message: string;
  onDismiss: () => void;
  style?: StyleProp<ViewStyle>;
};

export function Snackbar({ message, onDismiss, style }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, [message, onDismiss]);

  if (!message) return null;

  return (
    <View accessibilityLiveRegion="polite" style={[styles.snackbar, style]}>
      <Text style={styles.message}>{message}</Text>
      <Pressable accessibilityRole="button" hitSlop={8} onPress={onDismiss}>
        <Text style={styles.action}>Dismiss</Text>
      </Pressable>
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    snackbar: {
      position: "absolute",
      left: 16,
      right: 16,
      bottom: 16,
      maxWidth: 560,
      alignSelf: "center",
      minHeight: 48,
      paddingHorizontal: 16,
      paddingVertical: 12,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      borderRadius: shape.extraSmall,
      backgroundColor: colors.inverseSurface,
      ...elevation.level3,
    },
    message: { ...type.bodyMedium, flex: 1, color: colors.inverseOnSurface },
    action: { ...type.labelLarge, color: colors.inversePrimary },
  });
}
