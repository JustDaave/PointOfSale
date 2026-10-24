import { ScannedId } from "@/types/customer";
import { buildDate } from "@/utils/format";

// US and Canadian driver's licenses and state ID cards have a PDF417 barcode on the back.
// The data follows the AAMVA standard: every field is on its own line and
// starts with a 3 letter code. Example:
//   DCSSMITH        <- last name
//   DACJANE         <- first name
//   DBB01151990     <- birth date (MMDDYYYY)
//   DBA01152030     <- expiry date
//   DAQD1234567     <- license number
// https://www.aamva.org/identity/issuance-standards/cds-standard

function readField(data: string, code: string) {
  // A field starts at a new line, or right after "DL" (driver's license)
  // or "ID" (state ID card) for the very first field
  const match = data.match(new RegExp(`(?:^|\\n|DL|ID)${code}([^\\n]*)`));
  return match ? match[1].trim() : "";
}

// US cards use MMDDYYYY, Canadian cards use YYYYMMDD
function readDate(value: string) {
  if (!/^\d{8}$/.test(value)) return null;
  const firstFour = Number(value.slice(0, 4));
  if (firstFour > 1900) {
    return buildDate(firstFour, Number(value.slice(4, 6)), Number(value.slice(6, 8)));
  }
  return buildDate(Number(value.slice(4, 8)), Number(value.slice(0, 2)), Number(value.slice(2, 4)));
}

// "JANE" -> "Jane"
function capitalize(name: string) {
  return name
    .toLowerCase()
    .split(/([ -])/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

// Barcode readers don't all return the line breaks between fields the same way
// (line feed, carriage return, record separator...), so turn all of them into "\n"
function normalize(rawData: string) {
  return rawData.replace(/[\x00-\x1f\u0085\u2028\u2029]/g, "\n");
}

// For debugging a card that won't scan. Describes the barcode without
// showing any personal info (no names, dates, or numbers).
export function describeBarcode(rawData: string) {
  // The standard header ("@ ANSI 636040...") only has the state code and version, never personal info
  const header = rawData.startsWith("@") ? JSON.stringify(rawData.slice(0, 21)) : "none";
  const controlChars = [...new Set(rawData.match(/[\x00-\x1f\u0085\u2028\u2029]/g) ?? [])]
    .map((char) => "U+" + char.charCodeAt(0).toString(16).padStart(4, "0"))
    .join(" ");
  const fieldCodes = [...normalize(rawData).matchAll(/(?:^|\n|DL|ID)(D[A-D][A-Z])/g)].map((match) => match[1]);
  return `length=${rawData.length} header=${header} lineBreaks=[${controlChars}] fields=[${fieldCodes.join(",")}]`;
}

export function parseDriversLicense(rawData: string): ScannedId | null {
  const data = normalize(rawData);

  // Older cards use DCT for first name, and some only have the full name in DAA
  let firstName = readField(data, "DAC") || readField(data, "DCT");
  let lastName = readField(data, "DCS");
  if (!firstName && !lastName) {
    const [last = "", first = ""] = readField(data, "DAA").split(",");
    lastName = last;
    firstName = first;
  }

  const birthDate = readDate(readField(data, "DBB"));
  const expiryDate = readDate(readField(data, "DBA"));
  if (!firstName || !lastName || !birthDate || !expiryDate) return null;

  return {
    // Older cards put first and middle name together, like "JOHN,QUINCY" or "JOHN QUINCY"
    firstName: capitalize(firstName.split(/[ ,]/)[0]),
    lastName: capitalize(lastName),
    birthDate,
    expiryDate,
    idLast4: readField(data, "DAQ").slice(-4),
    state: readField(data, "DAJ"),
  };
}
