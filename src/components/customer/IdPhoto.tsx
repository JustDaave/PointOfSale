import { AppIcon } from "@/components/AppIcon";
import { icons } from "@/constants/icons";
import { shape, ThemeColors, type } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { Image } from "expo-image";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

// The picture of the ID taken by the camera while scanning
export function IdPhoto({ uri, style }: { uri: string | null; style?: StyleProp<ViewStyle> }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={[styles.frame, style]}>
      {uri ? (
        <Image accessibilityLabel="Photo of the ID" contentFit="cover" source={{ uri }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <AppIcon name={icons.idCard} color={colors.onSurfaceVariant} size={40} />
          <Text style={styles.placeholderText}>No ID photo</Text>
        </View>
      )}
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    // Driver's licenses are about 1.58 times wider than they are tall
    frame: { aspectRatio: 1.58, overflow: "hidden", borderRadius: shape.medium, backgroundColor: colors.surfaceContainerHighest },
    image: { width: "100%", height: "100%" },
    placeholder: { flex: 1, alignItems: "center", justifyContent: "center", gap: 8 },
    placeholderText: { ...type.labelLarge, color: colors.onSurfaceVariant },
  });
}
