import { BarcodeDetector } from "barcode-detector/ponyfill";

// Web version of readBarcodes.ts (Expo picks this file automatically on web).
// Chrome's built-in barcode reader, which expo-camera uses, can find the barcode
// on a real ID but sometimes gives back empty text. The ZXing reader from the
// barcode-detector package keeps the full text, so we use it directly instead.
export async function readBarcodesFromImage(uri: string) {
  const response = await fetch(uri);
  const image = await response.blob();
  const detector = new BarcodeDetector({ formats: ["pdf417"] });
  const results = await detector.detect(image);
  return results.map((result) => result.rawValue);
}
