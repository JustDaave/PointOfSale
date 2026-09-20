import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radii } from "@/constants/theme";
import { AppIcon } from "@/components/AppIcon";

const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "clear", "0", "delete"];

type Props = { pinLength: number; onKeyPress: (key: string) => void };

export function PinPad({ pinLength, onKeyPress }: Props) {
  return (
    <View>
      <View accessibilityLabel={`${pinLength} of 4 PIN digits entered`} style={styles.dots}>
        {[0, 1, 2, 3].map((index) => <View key={index} style={[styles.dot, index < pinLength && styles.dotFilled]} />)}
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
              <AppIcon name={{ ios: "delete.left", android: "backspace", web: "backspace" }} color={colors.ink} size={22} />
            ) : (
              <Text style={[styles.keyText, key === "clear" && styles.utilityText]}>{key === "clear" ? "Clear" : key}</Text>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dots: { flexDirection: "row", justifyContent: "center", gap: 14, marginBottom: 26 },
  dot: { width: 13, height: 13, borderRadius: 7, borderWidth: 2, borderColor: colors.border },
  dotFilled: { borderColor: colors.primary, backgroundColor: colors.primary },
  pad: { width: 264, flexDirection: "row", flexWrap: "wrap", gap: 12 },
  key: { width: 80, height: 58, alignItems: "center", justifyContent: "center", borderRadius: radii.medium, backgroundColor: colors.surfaceMuted },
  keyPressed: { backgroundColor: colors.primarySoft, transform: [{ scale: 0.98 }] },
  keyText: { color: colors.ink, fontSize: 21, fontWeight: "600" },
  utilityText: { color: colors.inkMuted, fontSize: 13 },
});
