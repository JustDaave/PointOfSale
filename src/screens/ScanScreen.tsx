import { AppIcon } from "@/components/AppIcon";
import { ManualEntryForm } from "@/components/scanner/ManualEntryForm";
import { ScanOverlay } from "@/components/scanner/ScanOverlay";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { SegmentedButtons } from "@/components/ui/SegmentedButtons";
import { Snackbar } from "@/components/ui/Snackbar";
import { TopAppBar } from "@/components/ui/TopAppBar";
import { icons } from "@/constants/icons";
import { ThemeColors, type } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { ScannedId } from "@/types/customer";
import { saveScannedCustomer } from "@/utils/customers";
import { parseDriversLicense } from "@/utils/idParser";
import { BarcodeScanningResult, CameraView, useCameraPermissions } from "expo-camera";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Mode = "camera" | "manual";

export function ScanScreen() {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  // The camera can report the same barcode many times per second, so this
  // ref makes sure we only handle one scan at a time (state updates too slowly)
  const handlingScan = useRef(false);

  const [mode, setMode] = useState<Mode>("camera");
  const [torchOn, setTorchOn] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  function goBack() {
    if (router.canGoBack()) router.back();
    else router.replace("/customers");
  }

  async function finish(scanned: ScannedId, phone: string, photoUri: string | null) {
    const customer = await saveScannedCustomer(scanned, phone, photoUri);
    // Replace so the back button on the results screen skips the scanner
    router.replace({ pathname: "/customers/[id]", params: { id: customer.id } });
  }

  async function handleBarcodeScanned(result: BarcodeScanningResult) {
    if (handlingScan.current) return;
    handlingScan.current = true;
    setBusy(true);

    const scanned = parseDriversLicense(result.data);
    if (!scanned) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setMessage("That barcode isn't from a driver's license. Try the barcode on the back of the ID.");
      // Wait a moment so the same barcode doesn't trigger again right away
      setTimeout(() => {
        handlingScan.current = false;
        setBusy(false);
      }, 2500);
      return;
    }

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    // Take a picture of the ID to show on the results screen
    let photoUri: string | null = null;
    try {
      const picture = await cameraRef.current?.takePictureAsync({ quality: 0.4, shutterSound: false });
      photoUri = picture?.uri ?? null;
    } catch (error) {
      console.warn("Could not take the ID photo", error);
    }

    try {
      await finish(scanned, "", photoUri);
    } catch {
      setMessage("Could not save the customer. Please try again.");
      handlingScan.current = false;
      setBusy(false);
    }
  }

  async function handleManualSubmit(scanned: ScannedId, phone: string) {
    setBusy(true);
    try {
      await finish(scanned, phone, null);
    } catch {
      setMessage("Could not save the customer. Please try again.");
      setBusy(false);
    }
  }

  function renderCamera() {
    // Permission is still loading
    if (!permission) return <View style={styles.cameraArea} />;

    if (!permission.granted) {
      return (
        <View style={styles.permission}>
          <AppIcon name={icons.camera} color={colors.primary} size={48} />
          <Text style={styles.permissionTitle}>Camera access needed</Text>
          <Text style={styles.permissionText}>
            The camera reads the barcode on the back of a driver's license to fill in the customer's details.
          </Text>
          {permission.canAskAgain ? (
            <Button icon={icons.camera} label="Allow camera" onPress={requestPermission} />
          ) : (
            <Text style={styles.permissionText}>Turn on camera access for this app in your device settings.</Text>
          )}
          <Button icon={icons.keyboard} label="Type it in instead" onPress={() => setMode("manual")} variant="text" />
        </View>
      );
    }

    return (
      <View style={styles.cameraArea}>
        <CameraView
          barcodeScannerSettings={{ barcodeTypes: ["pdf417"] }}
          enableTorch={torchOn}
          facing="back"
          onBarcodeScanned={busy ? undefined : handleBarcodeScanned}
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
        />
        <ScanOverlay busy={busy} message={busy ? "Reading ID…" : "Line up the barcode on the back of the ID"} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopAppBar
        actions={
          mode === "camera" &&
          permission?.granted && (
            <IconButton
              icon={torchOn ? icons.flashOff : icons.flashOn}
              label={torchOn ? "Turn flashlight off" : "Turn flashlight on"}
              onPress={() => setTorchOn(!torchOn)}
            />
          )
        }
        onBack={goBack}
        title="Scan ID"
      />
      <View style={styles.modeSwitch}>
        <SegmentedButtons
          onChange={setMode}
          options={[
            { value: "camera", label: "Camera", icon: icons.scan },
            { value: "manual", label: "Manual entry", icon: icons.keyboard },
          ]}
          selected={mode}
        />
      </View>

      {mode === "camera" ? (
        renderCamera()
      ) : (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.flex}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <ManualEntryForm onSubmit={handleManualSubmit} saving={busy} />
          </ScrollView>
        </KeyboardAvoidingView>
      )}
      <Snackbar message={message} onDismiss={() => setMessage("")} />
    </SafeAreaView>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.surface },
    flex: { flex: 1 },
    modeSwitch: { width: "100%", maxWidth: 420, alignSelf: "center", paddingHorizontal: 16, paddingBottom: 12 },
    cameraArea: { flex: 1, overflow: "hidden", backgroundColor: "#000000" },
    permission: { flex: 1, alignItems: "center", justifyContent: "center", gap: 16, padding: 32 },
    permissionTitle: { ...type.headlineSmall, color: colors.onSurface },
    permissionText: { ...type.bodyMedium, maxWidth: 420, color: colors.onSurfaceVariant, textAlign: "center" },
  });
}
