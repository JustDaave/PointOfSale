import { CartLine } from "@/types/menu";

export type Order = {
  id: string;
  number: string;
  createdAt: string; // ISO date string
  staffName: string;
  customerId: string | null;
  customerName: string | null;
  lines: CartLine[];
  subtotal: number;
  tax: number;
  total: number;
};
