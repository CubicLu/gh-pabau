const map = {
  GBP: '£',
  AED: 'د.إ',
  USD: '$',
  EUR: '€',
  NZD: '$',
  ZAR: 'R',
  PKR: '₨',
  PLN: 'zł',
  HKD: '$',
  AFN: '؋',
  SAR: '﷼',
  MXN: '$',
  PHP: '₱',
  RON: 'kr',
  NGN: '₦',
  EGP: '£',
  KES: 'Ksh',
  XCD: '$',
  BDT: '৳',
  CAD: '$',
  TRY: '₺',
  INR: '₹',
  PER: '%',
}

const stringToCurrencySignConverter = (currency: string): string =>
  map[currency] ?? '£'

export default stringToCurrencySignConverter
