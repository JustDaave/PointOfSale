import { AppIcon } from "@/components/AppIcon";
import { PinPad } from "@/components/login/PinPad";
import { StaffSelector } from "@/components/login/StaffSelector";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { IconButton } from "@/components/ui/IconButton";
import { icons } from "@/constants/icons";
import { shape, ThemeColors, type } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { staffMembers } from "@/data/staff";
import * as Haptics from "expo-haptics";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function getClockText() {
  const now = new Date();
  const date = now.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" });
  const time = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  return `${date} · ${time}`;
}

export function LoginScreen() {
  const { colors, isDark, toggleTheme } = useTheme();
  const { signIn } = useAuth();
  const { width } = useWindowDimensions();
  const styles = createStyles(colors);
  const [selectedId, setSelectedId] = useState(staffMembers[0].id);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [clock, setClock] = useState(getClockText());
  const isCompact = width < 760;
  const selectedStaff = staffMembers.find((person) => person.id === selectedId);

  // Update the clock in the footer every 30 seconds
  useEffect(() => {
    const timer = setInterval(() => setClock(getClockText()), 30000);
    return () => clearInterval(timer);
  }, []);

  function handleKeyPress(key: string) {
    setError("");
    if (key === "clear") setPin("");
    else if (key === "delete") setPin((value) => value.slice(0, -1));
    else setPin((value) => (value.length < 4 ? value + key : value));
  }

  function handleSelectStaff(id: string) {
    setSelectedId(id);
    setPin("");
    setError("");
  }

  function handleContinue() {
    // When sign in works, the protected routes in _layout.tsx open the menu for us
    const success = signIn(selectedId, pin);
    if (!success) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setError("Wrong PIN, try again.");
      setPin("");
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.brandRow}>
          <View style={styles.logoMark}>
            <AppIcon name={icons.store} color={colors.onPrimary} size={22} />
          </View>
          <View style={styles.flex}>
            <Text style={styles.brand}>Dave's Coffee Shop</Text>
            <Text style={styles.location}>Downtown · Register 01</Text>
          </View>
          <IconButton
            icon={isDark ? icons.lightMode : icons.darkMode}
            label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            onPress={toggleTheme}
          />
        </View>

        <View style={[styles.content, isCompact && styles.contentCompact]}>
          <View style={[styles.intro, isCompact && styles.introCompact]}>
            <Text style={styles.eyebrow}>Welcome back</Text>
            <Text style={styles.title}>Ready for your shift?</Text>
            <Text style={styles.subtitle}>Choose your profile, then enter your 4-digit PIN.</Text>
            <StaffSelector onSelect={handleSelectStaff} selectedId={selectedId} staff={staffMembers} />
          </View>

          <Card style={styles.loginCard} variant="elevated">
            <Text style={styles.cardTitle}>Sign in as {selectedStaff?.name}</Text>
            <Text style={[styles.cardHint, error ? styles.errorText : null]}>{error || "Enter your secure PIN"}</Text>
            <PinPad hasError={!!error} onKeyPress={handleKeyPress} pinLength={pin.length} />
            <Button
              disabled={pin.length !== 4}
              icon={icons.forward}
              label="Continue"
              large
              onPress={handleContinue}
              style={styles.continueButton}
            />
            <Text style={styles.demoHint}>Demo PIN: 1234</Text>
          </Card>
        </View>

        <Text style={styles.footer}>{clock}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.surface },
    flex: { flex: 1 },
    scrollContent: { flexGrow: 1, paddingHorizontal: 24, paddingVertical: 16 },
    brandRow: { flexDirection: "row", alignItems: "center", gap: 12 },
    logoMark: {
      width: 44,
      height: 44,
      borderRadius: shape.medium,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary,
    },
    brand: { ...type.titleMedium, color: colors.onSurface },
    location: { ...type.bodySmall, color: colors.onSurfaceVariant },
    content: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 72, paddingVertical: 32 },
    contentCompact: { flexDirection: "column", gap: 32 },
    intro: { maxWidth: 450, flex: 1 },
    introCompact: { flex: 0, width: "100%", alignItems: "center" },
    eyebrow: { ...type.labelLarge, color: colors.primary, marginBottom: 8 },
    title: { ...type.displaySmall, color: colors.onSurface },
    subtitle: { ...type.bodyLarge, color: colors.onSurfaceVariant, marginTop: 8, marginBottom: 24 },
    loginCard: { width: 344, alignItems: "center", padding: 32, borderRadius: shape.extraLarge },
    cardTitle: { ...type.titleLarge, color: colors.onSurface },
    cardHint: { ...type.bodyMedium, color: colors.onSurfaceVariant, marginTop: 4, marginBottom: 24 },
    errorText: { color: colors.error },
    continueButton: { alignSelf: "stretch", marginTop: 20 },
    demoHint: { ...type.bodySmall, color: colors.onSurfaceVariant, marginTop: 12 },
    footer: { ...type.bodySmall, color: colors.onSurfaceVariant },
  });
}
