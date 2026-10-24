import { AppIcon, AppIconName } from "@/components/AppIcon";
import { icons } from "@/constants/icons";
import { shape, ThemeColors, type } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { Pressable, StyleSheet, Text, View } from "react-native";

// Material 3 segmented buttons https://m3.material.io/components/segmented-buttons
type Option<T extends string> = { value: T; label: string; icon?: AppIconName };

type Props<T extends string> = {
  options: Option<T>[];
  selected: T;
  onChange: (value: T) => void;
};

export function SegmentedButtons<T extends string>({ options, selected, onChange }: Props<T>) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.group}>
      {options.map((option, index) => {
        const isSelected = option.value === selected;
        // Selected segments show a check mark in place of their icon
        const icon = isSelected ? icons.check : option.icon;
        const contentColor = isSelected ? colors.onSecondaryContainer : colors.onSurface;

        return (
          <Pressable
            accessibilityRole="tab"
            accessibilityState={{ selected: isSelected }}
            key={option.value}
            onPress={() => onChange(option.value)}
            style={({ pressed }) => [
              styles.segment,
              index > 0 && styles.divider,
              isSelected && styles.selected,
              pressed && styles.pressed,
            ]}
          >
            {icon && <AppIcon name={icon} color={contentColor} size={18} />}
            <Text style={[type.labelLarge, { color: contentColor }]}>{option.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    group: {
      height: 40,
      flexDirection: "row",
      overflow: "hidden",
      borderWidth: 1,
      borderColor: colors.outline,
      borderRadius: shape.full,
    },
    segment: { flex: 1, paddingHorizontal: 14, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
    divider: { borderLeftWidth: 1, borderLeftColor: colors.outline },
    selected: { backgroundColor: colors.secondaryContainer },
    pressed: { opacity: 0.75 },
  });
}
