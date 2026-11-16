import { useSafeAreaInsets } from "react-native-safe-area-context";

export { SafeAreaView } from "react-native-safe-area-context";

export function useBottomSafeAreaPadding(extra = 0) {
  const insets = useSafeAreaInsets();
  return { paddingBottom: extra + insets.bottom };
}
