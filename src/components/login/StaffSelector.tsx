import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radii } from "@/constants/theme";

const staff = [
  { name: "Alex", initials: "AM", role: "Manager" },
  { name: "Jordan", initials: "JL", role: "Cashier" },
  { name: "Taylor", initials: "TS", role: "Cashier" },
];

type Props = { selected: string; onSelect: (name: string) => void };

export function StaffSelector({ selected, onSelect }: Props) {
  return (
    <View style={styles.list}>
      {staff.map((person) => {
        const isSelected = person.name === selected;
        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            key={person.name}
            onPress={() => onSelect(person.name)}
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

const styles = StyleSheet.create({
  list: { flexDirection: "row", gap: 12, flexWrap: "wrap" },
  person: { minWidth: 112, padding: 14, borderRadius: radii.medium, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  personSelected: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  avatar: { width: 42, height: 42, borderRadius: 21, alignItems: "center", justifyContent: "center", marginBottom: 10, backgroundColor: colors.surfaceMuted },
  avatarSelected: { backgroundColor: colors.primary },
  initials: { color: colors.inkMuted, fontSize: 14, fontWeight: "700" },
  initialsSelected: { color: colors.surface },
  name: { color: colors.ink, fontSize: 15, fontWeight: "700" },
  role: { color: colors.inkMuted, fontSize: 12, marginTop: 2 },
  pressed: { opacity: 0.75 },
});
