import type { AppIconName } from "@/components/AppIcon";

export type MenuItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  color: string;
  icon: AppIconName;
};

export type CartLine = MenuItem & { quantity: number };
