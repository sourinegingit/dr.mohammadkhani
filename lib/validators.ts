/**
 * Validates Iranian 10-digit national ID (کد ملی)
 */
export function isValidIranianNationalId(code: string): boolean {
  if (!code || typeof code !== 'string') return false;
  const cleanCode = code.trim().replace(/\D/g, '');
  
  if (cleanCode.length !== 10) return false;
  
  // Reject identical digits like 0000000000 or 1111111111
  if (/^(\d)\1{9}$/.test(cleanCode)) return false;

  const check = parseInt(cleanCode[9], 10);
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCode[i], 10) * (10 - i);
  }
  const remainder = sum % 11;

  if (remainder < 2) {
    return check === remainder;
  } else {
    return check === 11 - remainder;
  }
}

/**
 * Validates Iranian mobile number (e.g. 0912..., 0935..., 98912...)
 */
export function isValidIranianPhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return false;
  const clean = phone.trim().replace(/\s|-/g, '');
  const regex = /^(0098|\+98|0)?9\d{9}$/;
  return regex.test(clean);
}

/**
 * Standardize phone to 09XXXXXXXXX
 */
export function formatIranianPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('98') && digits.length === 12) {
    return '0' + digits.substring(2);
  }
  if (digits.length === 10 && digits.startsWith('9')) {
    return '0' + digits;
  }
  return phone;
}

/**
 * Formats numbers into Persian digits
 */
export function toPersianDigits(num: string | number): string {
  if (num === null || num === undefined) return '';
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(num).replace(/\d/g, d => persianDigits[parseInt(d, 10)]);
}
