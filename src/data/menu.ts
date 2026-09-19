import { MenuItem } from "@/types/menu";

export const categories = ["Popular", "Coffee", "Breakfast", "Lunch", "Bakery", "Drinks"];

export const menuItems: MenuItem[] = [
  { id: "latte", name: "Vanilla Latte", category: "Coffee", price: 5.5, color: "#D9B99B", symbol: "☕" },
  { id: "cold-brew", name: "Cold Brew", category: "Coffee", price: 4.75, color: "#B8C9D1", symbol: "◉" },
  { id: "avo-toast", name: "Avocado Toast", category: "Breakfast", price: 9.5, color: "#AFC79B", symbol: "◒" },
  { id: "sandwich", name: "Club Sandwich", category: "Lunch", price: 12.25, color: "#E3C58E", symbol: "△" },
  { id: "croissant", name: "Butter Croissant", category: "Bakery", price: 4.25, color: "#E8B978", symbol: "◓" },
  { id: "bowl", name: "Harvest Bowl", category: "Lunch", price: 13.5, color: "#B4C99C", symbol: "◡" },
  { id: "pancakes", name: "Berry Pancakes", category: "Breakfast", price: 11, color: "#D8A3A5", symbol: "◎" },
  { id: "lemonade", name: "Mint Lemonade", category: "Drinks", price: 4.5, color: "#BDD6AE", symbol: "◇" },
];
