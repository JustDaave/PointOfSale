import { shape, ThemeColors, type } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { StaffMember } from "@/types/staff";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = { staff: StaffMember[]; selectedId: string; onSelect: (id: string) => void };

export function StaffSelector({ staff, selectedId, onSelect }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.list}>
      {staff.map((person) => {
        const isSelected = person.id === selectedId;
        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            key={person.id}
            onPress={() => onSelect(person.id)}
            style={({ pressed }) => [styles.person, isSelected && styles.personSelected, pressed && styles.pressed]}
          >
            <View style={[styles.avatar, isSelected && styles.avatarSelected]}>
              <Text style={[styles.initials, isSelected && styles.initialsSelected]}>{person.initials}</Text>
            </View>
            <Text style={styles.name}>{person.name}</Text>
            <Text style={styles.role}>{person.role}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    list: { flexDirection: "row", gap: 12, flexWrap: "wrap" },
    person: {
      minWidth: 112,
      padding: 16,
      borderRadius: shape.medium,
      borderWidth: 1,
      borderColor: colors.outlineVariant,
      backgroundColor: colors.surface,
    },
    personSelected: { borderColor: colors.secondaryContainer, backgroundColor: colors.secondaryContainer },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 12,
      backgroundColor: colors.surfaceContainerHighest,
    },
    avatarSelected: { backgroundColor: colors.primary },
    initials: { ...type.titleSmall, color: colors.onSurfaceVariant },
    initialsSelected: { color: colors.onPrimary },
    name: { ...type.titleMedium, color: colors.onSurface },
    role: { ...type.bodySmall, color: colors.onSurfaceVariant },
    pressed: { opacity: 0.75 },
  });
}
