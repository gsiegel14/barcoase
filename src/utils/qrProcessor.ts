/**
 * QR Code Processing Utilities
 * Handles appending .forexample to QR code data in the format WB##########|#######
 */

export const processQRData = (input: string, suffix: string = '.forexample'): string => {
  // Normalize suffix to ensure it starts with a dot
  const normalizedSuffix = suffix.startsWith('.') ? suffix : `.${suffix}`;

  // Check if input matches expected format: WB##########|#######
  const qrPattern = /^(WB\d{10})\|(\d{7})$/;
  const match = input.match(qrPattern);
  
  if (match) {
    const [, wbPart, numberPart] = match;
    return `${wbPart}${normalizedSuffix}|${numberPart}${normalizedSuffix}`;
  }
  
  // If doesn't match expected format, still try to append to each part separated by |
  if (input.includes('|')) {
    const parts = input.split('|');
    return parts.map(part => `${part.trim()}${normalizedSuffix}`).join('|');
  }
  
  // Single value, just append
  return `${input}${normalizedSuffix}`;
};

export const validateQRFormat = (input: string): boolean => {
  const qrPattern = /^WB\d{10}\|\d{7}$/;
  return qrPattern.test(input);
};

export const getFormatError = (input: string): string | null => {
  if (!input.trim()) {
    return 'Please enter QR code data';
  }
  
  if (!validateQRFormat(input)) {
    return 'Expected format: WB##########|####### (e.g., WB1234567890|9876543)';
  }
  
  return null;
};

export const processQRDataWithPrefix = (input: string, prefix: string = 'EDU'): string => {
  const sanitizedPrefix = prefix.trim();
  if (!sanitizedPrefix) return input;

  const qrPattern = /^(WB\d{10})\|(\d{7,})$/;
  const match = input.match(qrPattern);

  if (match) {
    const [, wbPart, numberPart] = match;
    return `${sanitizedPrefix}${wbPart}|${sanitizedPrefix}${numberPart}`;
  }

  // generic handling for any | separated string
  if (input.includes('|')) {
    const parts = input.split('|');
    return parts.map(p => `${sanitizedPrefix}${p.trim()}`).join('|');
  }

  return `${sanitizedPrefix}${input}`;
}; 