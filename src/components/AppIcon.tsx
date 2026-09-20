import { SymbolView, SymbolViewProps } from "expo-symbols";

export type AppIconName = SymbolViewProps["name"];

type Props = {
  name: AppIconName;
  color: string;
  size?: number;
};

export function AppIcon({ name, color, size = 20 }: Props) {
  return <SymbolView name={name} size={size} tintColor={color} />;
}
