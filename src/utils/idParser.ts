import { ScannedId } from "@/types/customer";
import { buildDate } from "@/utils/format";

// US and Canadian driver's licenses have a PDF417 barcode on the back.
// The data follows the AAMVA standard: every field is on its own line and
// starts with a 3 letter code. Example:
//   DCSSMITH        <- last name
//   DACJANE         <- first name
//   DBB01151990     <- birth date (MMDDYYYY)
//   DBA01152030     <- expiry date
//   DAQD1234567     <- license number
// https://www.aamva.org/identity/issuance-standards/cds-standard

function readField(data: string, code: string) {
  // A field starts at a new line, or right after "DL" for the very first field
  const match = data.match(new RegExp(`(?:^|[\\n\\r]|DL)${code}([^\\n\\r]*)`));
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

export function parseDriversLicense(data: string): ScannedId | null {
  if (!data.includes("ANSI") && !data.includes("AAMVA")) return null;

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
    firstName: capitalize(firstName.split(" ")[0]),
    lastName: capitalize(lastName),
    birthDate,
    expiryDate,
    idLast4: readField(data, "DAQ").slice(-4),
    state: readField(data, "DAJ"),
  };
}
