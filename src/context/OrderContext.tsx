import { Customer } from "@/types/customer";
import { CartLine, MenuItem } from "@/types/menu";
import { Order } from "@/types/order";
import { addOrder, loadOrders } from "@/utils/storage";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

// The open order is shared between screens: items are added on the register,
// and a customer can be attached from the ID scanner or customer screens.
// Finished orders are saved on the device and used for the order history,
// popular items and each customer's visits.
type OrderContextValue = {
  cart: CartLine[];
  customer: Customer | null;
  orders: Order[];
  addItem: (item: MenuItem) => void;
  changeQuantity: (id: string, delta: number) => void;
  setCustomer: (customer: Customer | null) => void;
  clearOrder: () => void;
  finishOrder: (order: Order) => Promise<void>;
};

const OrderContext = createContext<OrderContextValue | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    loadOrders().then(setOrders);
  }, []);

  function addItem(item: MenuItem) {
    setCart((current) => {
      const found = current.find((line) => line.id === item.id);
      return found
        ? current.map((line) => (line.id === item.id ? { ...line, quantity: line.quantity + 1 } : line))
        : [...current, { ...item, quantity: 1 }];
    });
  }

  function changeQuantity(id: string, delta: number) {
    setCart((current) =>
      current
        .map((line) => (line.id === id ? { ...line, quantity: line.quantity + delta } : line))
        .filter((line) => line.quantity > 0),
    );
  }

  function clearOrder() {
    setCart([]);
    setCustomer(null);
  }

  async function finishOrder(order: Order) {
    const updated = await addOrder(order);
    setOrders(updated);
    clearOrder();
  }

  return (
    <OrderContext.Provider
      value={{ cart, customer, orders, addItem, changeQuantity, setCustomer, clearOrder, finishOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrder must be used inside OrderProvider");
  return context;
}
