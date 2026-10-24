import { AppIcon } from "@/components/AppIcon";
import { icons } from "@/constants/icons";
import { shape, ThemeColors, type } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { Pressable, StyleSheet, Text, View } from "react-native";

const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "clear", "0", "delete"];

type Props = { pinLength: number; hasError: boolean; onKeyPress: (key: string) => void };

export function PinPad({ pinLength, hasError, onKeyPress }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View>
      <View accessibilityLabel={`${pinLength} of 4 PIN digits entered`} style={styles.dots}>
        {[0, 1, 2, 3].map((index) => (
          <View key={index} style={[styles.dot, index < pinLength && styles.dotFilled, hasError && styles.dotError]} />
        ))}
      </View>
      <View style={styles.pad}>
        {keys.map((key) => (
          <Pressable
            accessibilityLabel={key === "delete" ? "Delete digit" : key}
            accessibilityRole="button"
            key={key}
            onPress={() => onKeyPress(key)}
            style={({ pressed }) => [styles.key, pressed && styles.keyPressed]}
          >
            {key === "delete" ? (
              <AppIcon name={icons.deleteDigit} color={colors.onSurface} size={22} />
            ) : (
              <Text style={key === "clear" ? styles.utilityText : styles.keyText}>{key === "clear" ? "Clear" : key}</Text>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    dots: { flexDirection: "row", justifyContent: "center", gap: 14, marginBottom: 24 },
    dot: { width: 14, height: 14, borderRadius: 7, borderWidth: 2, borderColor: colors.outline },
    dotFilled: { borderColor: colors.primary, backgroundColor: colors.primary },
    dotError: { borderColor: colors.error, backgroundColor: colors.error },
    pad: { width: 264, flexDirection: "row", flexWrap: "wrap", gap: 12 },
    key: {
      width: 80,
      height: 56,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: shape.large,
      backgroundColor: colors.surfaceContainerHighest,
    },
    keyPressed: { backgroundColor: colors.secondaryContainer },
    keyText: { ...type.headlineSmall, color: colors.onSurface },
    utilityText: { ...type.labelLarge, color: colors.onSurfaceVariant },
  });
}
