export type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string; // YYYY-MM-DD
  expiryDate: string; // YYYY-MM-DD
  idLast4: string; // only the last 4 digits of the ID number are saved
  state: string;
  phone: string;
  photoUri: string | null;
  createdAt: string;
};

// What we get back after reading the barcode on the back of a driver's license
export type ScannedId = Omit<Customer, "id" | "phone" | "photoUri" | "createdAt">;
