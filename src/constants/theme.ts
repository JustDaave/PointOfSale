import { TextStyle } from "react-native";

// Material 3 color roles generated from our brand green (#245B45)
// with Google's material-color-utilities (Tonal Spot scheme).
// https://m3.material.io/styles/color/roles
export const lightColors = {
  primary: "#1F6A4F",
  onPrimary: "#FFFFFF",
  primaryContainer: "#A8F2CE",
  onPrimaryContainer: "#005139",
  secondary: "#4D6358",
  onSecondary: "#FFFFFF",
  secondaryContainer: "#CFE9D9",
  onSecondaryContainer: "#354B40",
  tertiary: "#3E6374",
  onTertiary: "#FFFFFF",
  tertiaryContainer: "#C1E8FC",
  onTertiaryContainer: "#254B5B",
  error: "#BA1A1A",
  onError: "#FFFFFF",
  errorContainer: "#FFDAD6",
  onErrorContainer: "#93000A",
  surface: "#F5FBF5",
  onSurface: "#171D1A",
  onSurfaceVariant: "#404943",
  surfaceContainerLowest: "#FFFFFF",
  surfaceContainerLow: "#EFF5EF",
  surfaceContainer: "#EAEFEA",
  surfaceContainerHigh: "#E4EAE4",
  surfaceContainerHighest: "#DEE4DE",
  outline: "#707973",
  outlineVariant: "#BFC9C2",
  inverseSurface: "#2C322E",
  inverseOnSurface: "#EDF2EC",
  inversePrimary: "#8CD5B3",
  scrim: "#000000",
};

export type ThemeColors = typeof lightColors;

export const darkColors: ThemeColors = {
  primary: "#8CD5B3",
  onPrimary: "#003826",
  primaryContainer: "#005139",
  onPrimaryContainer: "#A8F2CE",
  secondary: "#B3CCBE",
  onSecondary: "#1F352B",
  secondaryContainer: "#354B40",
  onSecondaryContainer: "#CFE9D9",
  tertiary: "#A5CCDF",
  onTertiary: "#083544",
  tertiaryContainer: "#254B5B",
  onTertiaryContainer: "#C1E8FC",
  error: "#FFB4AB",
  onError: "#690005",
  errorContainer: "#93000A",
  onErrorContainer: "#FFDAD6",
  surface: "#0F1512",
  onSurface: "#DEE4DE",
  onSurfaceVariant: "#BFC9C2",
  surfaceContainerLowest: "#0A0F0C",
  surfaceContainerLow: "#171D1A",
  surfaceContainer: "#1B211E",
  surfaceContainerHigh: "#252B28",
  surfaceContainerHighest: "#303632",
  outline: "#8A938C",
  outlineVariant: "#404943",
  inverseSurface: "#DEE4DE",
  inverseOnSurface: "#2C322E",
  inversePrimary: "#1F6A4F",
  scrim: "#000000",
};

// Material 3 type scale https://m3.material.io/styles/typography/type-scale-tokens
export const type = {
  displaySmall: { fontSize: 36, lineHeight: 44, fontWeight: "400" },
  headlineLarge: { fontSize: 32, lineHeight: 40, fontWeight: "400" },
  headlineMedium: { fontSize: 28, lineHeight: 36, fontWeight: "400" },
  headlineSmall: { fontSize: 24, lineHeight: 32, fontWeight: "400" },
  titleLarge: { fontSize: 22, lineHeight: 28, fontWeight: "400" },
  titleMedium: { fontSize: 16, lineHeight: 24, fontWeight: "500", letterSpacing: 0.15 },
  titleSmall: { fontSize: 14, lineHeight: 20, fontWeight: "500", letterSpacing: 0.1 },
  bodyLarge: { fontSize: 16, lineHeight: 24, fontWeight: "400", letterSpacing: 0.5 },
  bodyMedium: { fontSize: 14, lineHeight: 20, fontWeight: "400", letterSpacing: 0.25 },
  bodySmall: { fontSize: 12, lineHeight: 16, fontWeight: "400", letterSpacing: 0.4 },
  labelLarge: { fontSize: 14, lineHeight: 20, fontWeight: "500", letterSpacing: 0.1 },
  labelMedium: { fontSize: 12, lineHeight: 16, fontWeight: "500", letterSpacing: 0.5 },
  labelSmall: { fontSize: 11, lineHeight: 16, fontWeight: "500", letterSpacing: 0.5 },
} satisfies Record<string, TextStyle>;

// Material 3 corner radius scale https://m3.material.io/styles/shape/corner-radius-scale
export const shape = {
  extraSmall: 4,
  small: 8,
  medium: 12,
  large: 16,
  extraLarge: 28,
  full: 999,
};

// Material 3 elevation levels (shadows) https://m3.material.io/styles/elevation/tokens
export const elevation = {
  level1: { boxShadow: "0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px rgba(0, 0, 0, 0.3)" },
  level2: { boxShadow: "0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px rgba(0, 0, 0, 0.3)" },
  level3: { boxShadow: "0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3)" },
};

// Screen widths where the layout changes (M3 window size classes)
export const breakpoints = {
  medium: 600,
  expanded: 840,
};
