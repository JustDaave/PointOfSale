import { IconButton } from "@/components/ui/IconButton";
import { icons } from "@/constants/icons";
import { ThemeColors, type } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

// Material 3 small top app bar https://m3.material.io/components/top-app-bar
type Props = {
  title: string;
  onBack?: () => void;
  actions?: ReactNode;
};

export function TopAppBar({ title, onBack, actions }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.bar}>
      {onBack && <IconButton icon={icons.back} label="Go back" onPress={onBack} color={colors.onSurface} />}
      <Text numberOfLines={1} style={styles.title}>
        {title}
      </Text>
      <View style={styles.actions}>{actions}</View>
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    bar: { height: 64, paddingHorizontal: 8, flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: colors.surface },
    title: { ...type.titleLarge, flex: 1, marginLeft: 8, color: colors.onSurface },
    actions: { flexDirection: "row", alignItems: "center", gap: 4 },
  });
}
