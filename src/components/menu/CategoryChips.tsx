import { Chip } from "@/components/ui/Chip";
import { ScrollView, StyleSheet } from "react-native";

// Horizontal row of filter chips for the phone layout
type Props = { categories: string[]; selected: string; onSelect: (category: string) => void };

export function CategoryChips({ categories, selected, onSelect }: Props) {
  return (
    <ScrollView contentContainerStyle={styles.row} horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
      {categories.map((category) => (
        <Chip key={category} label={category} onPress={() => onSelect(category)} selected={category === selected} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 0 },
  row: { paddingHorizontal: 16, paddingVertical: 8, gap: 8 },
});
