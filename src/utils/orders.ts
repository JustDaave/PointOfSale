import { Customer } from "@/types/customer";
import { CartLine, MenuItem } from "@/types/menu";
import { Order } from "@/types/order";
import { createId } from "@/utils/format";

export const TAX_RATE = 0.0825;

export function calculateTotals(lines: CartLine[]) {
  const subtotal = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  return { subtotal, tax, total: subtotal + tax, itemCount };
}

export function createOrder(lines: CartLine[], customer: Customer | null, staffName: string): Order {
  const { subtotal, tax, total } = calculateTotals(lines);
  return {
    id: createId(),
    number: Date.now().toString().slice(-6),
    createdAt: new Date().toISOString(),
    staffName,
    customerId: customer?.id ?? null,
    customerName: customer ? `${customer.firstName} ${customer.lastName}` : null,
    lines,
    subtotal,
    tax,
    total,
  };
}

// How many of each menu item have been sold, e.g. { latte: 12, "cold-brew": 4 }
export function countItemsSold(orders: Order[]) {
  const counts: Record<string, number> = {};
  for (const order of orders) {
    for (const line of order.lines) {
      counts[line.id] = (counts[line.id] ?? 0) + line.quantity;
    }
  }
  return counts;
}

// Best sellers first. Items that sold the same amount keep their menu order.
export function sortByPopularity(items: MenuItem[], soldCounts: Record<string, number>) {
  return [...items].sort((a, b) => (soldCounts[b.id] ?? 0) - (soldCounts[a.id] ?? 0));
}

// Top products for one customer, used on the identification results screen
export function getFavoriteProducts(orders: Order[], limit = 3) {
  const counts = countItemsSold(orders);
  const names: Record<string, string> = {};
  orders.forEach((order) => order.lines.forEach((line) => (names[line.id] = line.name)));

  return Object.keys(counts)
    .map((id) => ({ id, name: names[id], quantity: counts[id] }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, limit);
}
