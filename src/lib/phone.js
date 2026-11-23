const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export function toLatinDigits(value) {
  return String(value ?? "")
    .replace(/[۰-۹]/g, (digit) => String(digit.charCodeAt(0) - 1776))
    .replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - 1632));
}

export function toPersianDigits(value) {
  return toLatinDigits(value).replace(/\d/g, (digit) => persianDigits[Number(digit)]);
}

export function normalizePhone(value) {
  const latin = toLatinDigits(value).replace(/[\s()-]/g, "");

  if (latin.startsWith("+98")) return `0${latin.slice(3)}`;
  if (latin.startsWith("0098")) return `0${latin.slice(4)}`;
  if (latin.startsWith("98") && latin.length === 12) return `0${latin.slice(2)}`;
  if (latin.startsWith("9") && latin.length === 10) return `0${latin}`;

  return latin;
}

export function isValidIranianPhone(value) {
  return /^09\d{9}$/.test(normalizePhone(value));
}

export function formatIranianPhone(value) {
  const normalized = normalizePhone(value);

  if (!/^09\d{9}$/.test(normalized)) return toPersianDigits(value);

  return toPersianDigits(`${normalized.slice(0, 4)} ${normalized.slice(4, 7)} ${normalized.slice(7)}`);
}

export function formatTimer(seconds) {
  const safe = Math.max(0, Math.floor(seconds));
  const minutes = String(Math.floor(safe / 60)).padStart(2, "0");
  const remaining = String(safe % 60).padStart(2, "0");

  return toPersianDigits(`${minutes}:${remaining}`);
}
