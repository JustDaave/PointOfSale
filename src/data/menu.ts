import { MenuItem } from "@/types/menu";

export const categories = ["Popular", "Coffee", "Breakfast", "Lunch", "Bakery", "Drinks"];

export const menuItems: MenuItem[] = [
  { id: "latte", name: "Vanilla Latte", category: "Coffee", price: 5.5, color: "#D9B99B", icon: { ios: "cup.and.saucer.fill", android: "coffee", web: "coffee" } },
  { id: "cold-brew", name: "Cold Brew", category: "Coffee", price: 4.75, color: "#B8C9D1", icon: { ios: "mug.fill", android: "local_cafe", web: "local_cafe" } },
  { id: "avo-toast", name: "Avocado Toast", category: "Breakfast", price: 9.5, color: "#AFC79B", icon: { ios: "leaf.fill", android: "eco", web: "eco" } },
  { id: "sandwich", name: "Club Sandwich", category: "Lunch", price: 12.25, color: "#E3C58E", icon: { ios: "takeoutbag.and.cup.and.straw.fill", android: "lunch_dining", web: "lunch_dining" } },
  { id: "croissant", name: "Butter Croissant", category: "Bakery", price: 4.25, color: "#E8B978", icon: { ios: "birthday.cake.fill", android: "bakery_dining", web: "bakery_dining" } },
  { id: "bowl", name: "Harvest Bowl", category: "Lunch", price: 13.5, color: "#B4C99C", icon: { ios: "takeoutbag.and.cup.and.straw.fill", android: "soup_kitchen", web: "soup_kitchen" } },
  { id: "pancakes", name: "Berry Pancakes", category: "Breakfast", price: 11, color: "#D8A3A5", icon: { ios: "birthday.cake.fill", android: "breakfast_dining", web: "breakfast_dining" } },
  { id: "lemonade", name: "Mint Lemonade", category: "Drinks", price: 4.5, color: "#BDD6AE", icon: { ios: "waterbottle.fill", android: "local_drink", web: "local_drink" } },
];
