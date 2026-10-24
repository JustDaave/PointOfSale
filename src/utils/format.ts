const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatMoney(amount: number) {
  return `$${amount.toFixed(2)}`;
}

export function createId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// "YYYY-MM-DD" -> Date in local time.
// (new Date("1990-01-15") would use UTC and can show the day before.)
function toLocalDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day);
}

// "1990-01-15" -> "Jan 15, 1990"
export function formatDate(date: string) {
  if (!date) return "Unknown";
  const value = toLocalDate(date);
  return `${monthNames[value.getMonth()]} ${value.getDate()}, ${value.getFullYear()}`;
}

// ISO timestamp -> "Jan 15, 2:30 PM"
export function formatDateTime(isoString: string) {
  const value = new Date(isoString);
  const time = value.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  return `${monthNames[value.getMonth()]} ${value.getDate()}, ${time}`;
}

export function getAge(birthDate: string) {
  const birth = toLocalDate(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const hadBirthdayThisYear =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());
  if (!hadBirthdayThisYear) age -= 1;
  return age;
}

export function isExpired(expiryDate: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return toLocalDate(expiryDate) < today;
}

// Checks that year, month and day make a real date and returns "YYYY-MM-DD"
export function buildDate(year: number, month: number, day: number) {
  const value = new Date(year, month - 1, day);
  const isReal = value.getFullYear() === year && value.getMonth() === month - 1 && value.getDate() === day;
  if (!isReal || year < 1900 || year > 2100) return null;
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

// What the user types in the manual form: "01/15/1990" -> "1990-01-15"
export function parseDateInput(text: string) {
  const match = text.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!match) return null;
  return buildDate(Number(match[3]), Number(match[1]), Number(match[2]));
}

// "5551234567" -> "(555) 123-4567"
export function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length !== 10) return phone;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}
