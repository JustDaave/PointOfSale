import { shape, ThemeColors, type } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

// Category list on the left side of the tablet layout.
// Styled like the items in an M3 navigation drawer.
type Props = { categories: string[]; selected: string; onSelect: (category: string) => void };

export function CategoryRail({ categories, selected, onSelect }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>Categories</Text>
      {categories.map((category) => {
        const active = category === selected;
        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            key={category}
            onPress={() => onSelect(category)}
            style={({ pressed }) => [styles.item, active && styles.activeItem, pressed && styles.pressed]}
          >
            <Text style={[styles.text, active && styles.activeText]}>{category}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    list: { padding: 12, gap: 4 },
    heading: { ...type.titleSmall, color: colors.onSurfaceVariant, paddingHorizontal: 16, paddingVertical: 12 },
    item: { height: 56, paddingHorizontal: 16, justifyContent: "center", borderRadius: shape.full },
    activeItem: { backgroundColor: colors.secondaryContainer },
    pressed: { backgroundColor: colors.onSurface + "14" },
    text: { ...type.labelLarge, color: colors.onSurfaceVariant },
    activeText: { color: colors.onSecondaryContainer },
  });
}
