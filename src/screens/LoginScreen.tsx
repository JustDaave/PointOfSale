import { AppIcon } from "@/components/AppIcon";
import { PinPad } from "@/components/login/PinPad";
import { StaffSelector } from "@/components/login/StaffSelector";
import { colors, radii } from "@/constants/theme";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function LoginScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [selectedStaff, setSelectedStaff] = useState("Alex");
  const [pin, setPin] = useState("");
  const isCompact = width < 760;

  function handleKeyPress(key: string) {
    if (key === "clear") setPin("");
    else if (key === "delete") setPin((value) => value.slice(0, -1));
    else setPin((value) => (value.length < 4 ? value + key : value));
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.brandRow}>
          <View style={styles.logoMark}><AppIcon name={{ ios: "storefront.fill", android: "storefront", web: "storefront" }} color={colors.surface} size={22} /></View>
          <View><Text style={styles.brand}>Dave's Coffee Shop</Text><Text style={styles.location}>Downtown · Register 01</Text></View>
        </View>
        <View style={[styles.content, isCompact && styles.contentCompact]}>
          <View style={[styles.intro, isCompact && styles.introCompact]}>
            <Text style={styles.eyebrow}>WELCOME BACK</Text>
            <Text style={styles.title}>Ready for your shift?</Text>
            <Text style={styles.subtitle}>Choose your profile, then enter your 4-digit PIN.</Text>
            <StaffSelector selected={selectedStaff} onSelect={setSelectedStaff} />
          </View>
          <View style={styles.loginCard}>
            <Text style={styles.cardTitle}>Sign in as {selectedStaff}</Text>
            <Text style={styles.cardHint}>Enter your secure PIN</Text>
            <PinPad pinLength={pin.length} onKeyPress={handleKeyPress} />
            <Pressable
              accessibilityRole="button"
              disabled={pin.length !== 4}
              onPress={() => router.replace({ pathname: "/menu", params: { staff: selectedStaff } })}
              style={({ pressed }) => [styles.continueButton, pin.length !== 4 && styles.continueDisabled, pressed && styles.continuePressed]}
            >
              <Text style={styles.continueText}>Continue</Text>
              <AppIcon name={{ ios: "arrow.right", android: "arrow_forward", web: "arrow_forward" }} color={colors.surface} size={19} />
            </Pressable>
          </View>
        </View>
        <Text style={styles.footer}>Friday, September 18 · 9:41 AM</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  scrollContent: { flexGrow: 1, paddingHorizontal: 32, paddingVertical: 24 },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  logoMark: { width: 42, height: 42, borderRadius: 13, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary },
  brand: { color: colors.ink, fontSize: 17, fontWeight: "800" },
  location: { color: colors.inkMuted, fontSize: 12, marginTop: 1 },
  content: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 72, paddingVertical: 30 },
  contentCompact: { flexDirection: "column", gap: 30 },
  intro: { maxWidth: 450, flex: 1 },
  introCompact: { flex: 0, width: "100%", alignItems: "center" },
  eyebrow: { color: colors.primary, fontSize: 12, fontWeight: "800", letterSpacing: 1.5, marginBottom: 12 },
  title: { color: colors.ink, fontSize: 42, lineHeight: 48, fontWeight: "800", letterSpacing: -1.2 },
  subtitle: { color: colors.inkMuted, fontSize: 16, lineHeight: 24, marginTop: 12, marginBottom: 28 },
  loginCard: { width: 344, alignItems: "center", padding: 32, borderWidth: 1, borderColor: colors.border, borderRadius: radii.large, backgroundColor: colors.surface },
  cardTitle: { color: colors.ink, fontSize: 20, fontWeight: "800" },
  cardHint: { color: colors.inkMuted, fontSize: 13, marginTop: 5, marginBottom: 24 },
  continueButton: { width: "100%", height: 54, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 20, borderRadius: radii.medium, backgroundColor: colors.primary },
  continueDisabled: { opacity: 0.35 },
  continuePressed: { opacity: 0.85 },
  continueText: { color: colors.surface, fontSize: 16, fontWeight: "700" },
  footer: { color: colors.inkMuted, fontSize: 12 },
});
