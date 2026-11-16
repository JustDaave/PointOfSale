import type { ReactNode } from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import type { Edge } from "react-native-safe-area-context";

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  edges?: readonly Edge[];
};

// SDK 58 Router leaves web insets at zero so measurements cannot interrupt
// hydration. Let the browser apply safe-area spacing through CSS instead.
export function SafeAreaView({ children, style, edges = ["top", "right", "bottom", "left"] }: Props) {
  const padding = Object.fromEntries(
    edges.map((edge) => [
      `padding${edge[0].toUpperCase()}${edge.slice(1)}`,
      `env(safe-area-inset-${edge}, 0px)`,
    ]),
  );

  return <View style={[style, padding]}>{children}</View>;
}

export function useBottomSafeAreaPadding(extra = 0): ViewStyle {
  // React Native Web accepts CSS values; native ViewStyle only types lengths.
  return { paddingBottom: `calc(${extra}px + env(safe-area-inset-bottom, 0px))` } as unknown as ViewStyle;
}
