import { AuthProvider, useAuth } from "@/context/AuthContext";
import { OrderProvider } from "@/context/OrderContext";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

function AppStack() {
  const { staff } = useAuth();
  const { colors, isDark } = useTheme();
  const signedIn = staff !== null;

  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack screenOptions={{ headerShown: false, animation: "fade", contentStyle: { backgroundColor: colors.surface } }}>
        {/* Login is only available when nobody is signed in */}
        <Stack.Protected guard={!signedIn}>
          <Stack.Screen name="index" />
        </Stack.Protected>
        {/* Everything else needs a signed in staff member.
            Signing in or out automatically moves to the right screen. */}
        <Stack.Protected guard={signedIn}>
          <Stack.Screen name="menu" />
          <Stack.Screen name="orders" />
          <Stack.Screen name="customers/index" />
          <Stack.Screen name="customers/[id]" />
          <Stack.Screen name="scan" options={{ animation: "slide_from_bottom" }} />
        </Stack.Protected>
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <OrderProvider>
            <AppStack />
          </OrderProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
