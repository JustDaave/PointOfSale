import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { colors, radii } from "@/constants/theme";
import { AppIcon } from "@/components/AppIcon";

type Props = { categories: string[]; selected: string; horizontal?: boolean; onSelect: (category: string) => void };

export function CategoryRail({ categories, selected, horizontal = false, onSelect }: Props) {
  return (
    <ScrollView horizontal={horizontal} showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.list, horizontal && styles.horizontal]}>
      {categories.map((category) => {
        const active = category === selected;
        return (
          <Pressable key={category} onPress={() => onSelect(category)} style={({ pressed }) => [styles.button, active && styles.activeButton, pressed && styles.pressed]}>
            <Text style={[styles.text, active && styles.activeText]}>{category}</Text>
            <AppIcon name={{ ios: "chevron.right", android: "chevron_right", web: "chevron_right" }} color={active ? colors.surface : colors.inkMuted} size={18} />
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: { gap: 8, paddingVertical: 4 },
  horizontal: { flexDirection: "row", paddingHorizontal: 20 },
  button: { minWidth: 132, height: 48, paddingHorizontal: 14, borderRadius: radii.medium, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  activeButton: { backgroundColor: colors.primary },
  text: { color: colors.inkMuted, fontSize: 15, fontWeight: "600" },
  activeText: { color: colors.surface },
  pressed: { opacity: 0.75 },
});
