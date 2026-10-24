import { darkColors, lightColors, ThemeColors } from "@/constants/theme";
import { loadThemeMode, saveThemeMode, ThemeMode } from "@/utils/storage";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

// Every screen and component needs the current colors, so the theme lives in
// context instead of being passed down as a prop through every component.
type ThemeContextValue = {
  colors: ThemeColors;
  isDark: boolean;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>("system");

  // Load the theme the user picked last time
  useEffect(() => {
    loadThemeMode().then(setModeState);
  }, []);

  const isDark = mode === "system" ? systemScheme === "dark" : mode === "dark";

  function setMode(newMode: ThemeMode) {
    setModeState(newMode);
    saveThemeMode(newMode);
  }

  function toggleTheme() {
    setMode(isDark ? "light" : "dark");
  }

  return (
    <ThemeContext.Provider value={{ colors: isDark ? darkColors : lightColors, isDark, mode, setMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}
