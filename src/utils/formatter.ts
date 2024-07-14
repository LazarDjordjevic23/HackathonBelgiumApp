import BigNumber from 'bignumber.js';
import { format, parseISO } from 'date-fns';

// Define the number and precision
BigNumber.config({ ROUNDING_MODE: BigNumber.ROUND_FLOOR });
const number = new BigNumber('0.0000123456789');

export const formatNumber = (number: string | number, precision = 10) => {
  if (number === null || number === undefined) return 0;
  const formattedNumber = (+number).toFixed(precision);
  return formattedNumber;
};

const isValidProp = (value: any) => Number.isFinite(value) || !!value;
const andString = (index: number) => (index ? '&' : '');

export const fromObjToQueryParams = (obj: Record<string, any>): string => {
  return Object.entries(obj).reduce(
    (prevResult, [key, value], index) => prevResult + (isValidProp(value) ? `${andString(index)}${key}=${value}` : ''),
    '?',
  );
};

export const formatAddress = (txHash = ''): { showed: string; fullString: string } => {
  if (!txHash)
    return {
      showed: '',
      fullString: '',
    };

  return {
    showed: [txHash?.substring?.(0, 4), txHash?.substring?.(txHash?.length - 5, txHash?.length)].join('...'),
    fullString: txHash,
  };
};

export const formatDateToISOExtended = (date: Date) => {
  const isoString = date.toISOString(); // Example: '2024-06-27T12:18:45.902Z'

  // Extract date and time parts
  const datePart = isoString.split('T')[0]; // '2024-06-27'
  const timePart = isoString.split('T')[1].split('Z')[0]; // '12:18:45.902'

  // Combine date and time parts with timezone
  const formattedDate = `${datePart} ${timePart}+00:00`;

  return formattedDate;
};

export const formatUTCDate = (date: Date) => {
  if (!date) return '';
  const isoString = date.toISOString();
  const formattedDate = format(parseISO(isoString), 'yyyy-MM-dd HH:mm:ss.SSSSSSxxx');
  return formattedDate;
};

export const objectToQueryString = (obj) => {
  return [
    '?',
    Object.keys(obj)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
      .join('&'),
  ].join('');
};

export const addHttps = (link: string): string => {
  if(!link) return ''
  if (link.includes('https://')) return link;
  return `https://${link}`;
};
