import { Customer, ScannedId } from "@/types/customer";
import { createId } from "@/utils/format";
import { saveIdPhoto } from "@/utils/photo";
import { loadCustomers, saveCustomer } from "@/utils/storage";

// Saves a scanned (or typed in) ID. If the same person was scanned before we
// update their saved record so their visits and favorites stay connected.
export async function saveScannedCustomer(scanned: ScannedId, phone: string, tempPhotoUri: string | null) {
  const customers = await loadCustomers();
  const existing = customers.find(
    (customer) =>
      customer.firstName.toLowerCase() === scanned.firstName.toLowerCase() &&
      customer.lastName.toLowerCase() === scanned.lastName.toLowerCase() &&
      customer.birthDate === scanned.birthDate,
  );

  const id = existing?.id ?? createId();
  let photoUri = existing?.photoUri ?? null;
  if (tempPhotoUri) {
    try {
      photoUri = await saveIdPhoto(tempPhotoUri, id);
    } catch (error) {
      console.warn("Could not save the ID photo", error);
    }
  }

  const customer: Customer = {
    ...scanned,
    id,
    phone: phone || existing?.phone || "",
    photoUri,
    createdAt: existing?.createdAt ?? new Date().toISOString(),
  };
  await saveCustomer(customer);
  return customer;
}
