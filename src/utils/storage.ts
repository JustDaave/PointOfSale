import { Customer } from "@/types/customer";
import { Order } from "@/types/order";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Everything the app saves on the device goes through this file.
// AsyncStorage only stores strings, so objects are saved as JSON.
const KEYS = {
  orders: "pos.orders",
  customers: "pos.customers",
  themeMode: "pos.themeMode",
};

export type ThemeMode = "system" | "light" | "dark";

async function readJson<T>(key: string, fallback: T): Promise<T> {
  try {
    const saved = await AsyncStorage.getItem(key);
    return saved ? (JSON.parse(saved) as T) : fallback;
  } catch (error) {
    console.warn(`Could not read ${key}`, error);
    return fallback;
  }
}

async function writeJson(key: string, value: unknown) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

// ----- Orders -----

export function loadOrders() {
  return readJson<Order[]>(KEYS.orders, []);
}

export async function addOrder(order: Order) {
  const orders = await loadOrders();
  const updated = [order, ...orders];
  await writeJson(KEYS.orders, updated);
  return updated;
}

// ----- Customers -----

export function loadCustomers() {
  return readJson<Customer[]>(KEYS.customers, []);
}

export async function getCustomer(id: string) {
  const customers = await loadCustomers();
  return customers.find((customer) => customer.id === id) ?? null;
}

// Adds a new customer or replaces the one with the same id
export async function saveCustomer(customer: Customer) {
  const customers = await loadCustomers();
  const others = customers.filter((item) => item.id !== customer.id);
  await writeJson(KEYS.customers, [customer, ...others]);
}

export async function deleteCustomer(id: string) {
  const customers = await loadCustomers();
  await writeJson(KEYS.customers, customers.filter((customer) => customer.id !== id));
}

// ----- Settings -----

export async function loadThemeMode() {
  const mode = await AsyncStorage.getItem(KEYS.themeMode);
  return mode === "light" || mode === "dark" ? mode : "system";
}

export async function saveThemeMode(mode: ThemeMode) {
  await AsyncStorage.setItem(KEYS.themeMode, mode);
}
