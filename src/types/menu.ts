export type MenuItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  color: string;
  symbol: string;
};

export type CartLine = MenuItem & { quantity: number };
