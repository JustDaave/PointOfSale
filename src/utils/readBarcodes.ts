import { scanFromURLAsync } from "expo-camera";

// Reads the PDF417 barcodes in a photo and returns their text.
// This is the phone version, the web version is in readBarcodes.web.ts
export async function readBarcodesFromImage(uri: string) {
  const results = await scanFromURLAsync(uri, ["pdf417"]);
  return results.map((result) => result.data);
}
