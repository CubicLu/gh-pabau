import { TFunction } from 'i18next'

export const giftCardSettings = (t: TFunction) => {
  return {
    cardWidth: 500,
    backgroundColor1: '#9013FE',
    backgroundColor2: '#BD10E0',
    gradientType: 'linear-gradient',
    borderColor: '#000',
    bookNowButton: true,
    buttonLabel: t('giftvouchers.create.label.booknow'),
    showMenu: true,

    voucherType: '',
    voucherNum: 100001,
    voucherPrice: 100,
    voucherPriceLabel: 'Voucher Value',
    voucherSoldPrice: 100,
    voucherSoldPriceLabel: 'Sold 5',
    voucherRelation: 'Family',
    voucherRelationLabel: 'Redeem on all services',
    currencyType: '£',
    termsConditions: `
    lorem ipsum, quia dolor sit, amet, consectetur, adipisci
    velit, sed quia non numquam eius modi tempora incidunt, ut
    labore et dolore magnam aliquam quaerat voluptatem.
  `,
  }
}

export const defaultThemes = [
  {
    name: 'Love',
    url:
      'https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2020/02/valentines-day-1581614371.jpg',
  },
  {
    name: 'Birthday 1',
    url:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cute-birthday-instagram-captions-1584723902.jpg',
  },
  {
    name: 'Birthday 2',
    url:
      'https://thumbs.dreamstime.com/b/happy-birthday-cupcake-celebration-message-160558421.jpg',
  },
]

export const defaultBgColors = [
  {
    background: 'linear-gradient(105.26deg, #6E4BF6 2.87%, #B94AF4 100%)',
    selected: false,
  },
  {
    background: 'linear-gradient(67.52deg, #FDB720 0%, #E86D22 92.36%)',
    selected: false,
  },
  {
    background: 'linear-gradient(67.52deg, #5AA8FF 0%, #077DFF 92.36%)',
    selected: false,
  },
  {
    background: 'linear-gradient(67.52deg, #00A36E 0%, #00A69B 92.36%)',
    selected: false,
  },
]

export const data = [
  {
    id: 1,
    key: '1',
    number: '7214771214',
    description: 'FTT Voucher',
    name: 'FTT Voucher',
    purchase_date: '14/01/2021',
    expiry_date: '14/01/2022',
    amount: 100,
    remaining_balance: '£100',
    is_active: 1,
    index: 0,
  },
  {
    id: 2,
    key: '2',
    number: '7214771214',
    description: 'FTT Voucher',
    name: 'FTT Voucher',
    purchase_date: '14/01/2021',
    expiry_date: '14/01/2022',
    amount: 100,
    remaining_balance: '£100',
    is_active: 0,
    index: 1,
  },
  {
    id: 3,
    key: '3',
    number: '7214771214',
    description: 'FTT Voucher',
    name: 'FTT Voucher',
    purchase_date: '14/01/2021',
    expiry_date: '14/01/2022',
    amount: 100,
    remaining_balance: '£100',
    is_active: 0,
    index: 2,
  },
  {
    id: 4,
    key: '4',
    number: '7214771214',
    description: 'FTT Voucher',
    name: 'FTT Voucher',
    purchase_date: '14/01/2021',
    expiry_date: '14/01/2022',
    amount: 100,
    remaining_balance: '£100',
    is_active: 1,
    index: 3,
  },
  {
    id: 5,
    key: '5',
    number: '7214771214',
    description: 'FTT Voucher',
    name: 'FTT Voucher',
    purchase_date: '14/01/2021',
    expiry_date: '14/01/2022',
    amount: 100,
    remaining_balance: '£100',
    is_active: 1,
    index: 4,
  },
  {
    id: 6,
    key: '6',
    number: '7214771214',
    description: 'FTT Voucher',
    name: 'FTT Voucher',
    purchase_date: '14/01/2021',
    expiry_date: '14/01/2022',
    amount: 100,
    remaining_balance: '£100',
    is_active: 0,
    index: 5,
  },
  {
    id: 7,
    key: '7',
    number: '7214771214',
    description: 'FTT Voucher',
    name: 'FTT Voucher',
    purchase_date: '14/01/2021',
    expiry_date: '14/01/2022',
    amount: 100,
    remaining_balance: '£100',
    is_active: 0,
    index: 6,
  },
]

export const treeData = [
  {
    title: 'Seasonal Offers (8)',
    key: 2,
    children: [
      {
        title: '4 ml contour package',
        label: '1h 30min',
        key: 2.1,
      },
      {
        title: '2 ml contour',
        label: '1h',
        key: 2.2,
      },
      {
        title: '1 ml filler',
        label: '1h 25min',
        key: 2.3,
      },
    ],
  },
  {
    title: 'Special Offers (12)',
    key: 3,
    children: [
      {
        title: '4 ml contour package',
        label: '1h 30min',
        key: 3.1,
      },
    ],
  },
  {
    title: 'Face Services (23)',
    key: 4,
    children: [
      {
        title: '4 ml contour package',
        label: '1h 30min',
        key: 4.1,
      },
    ],
  },
  {
    title: 'Body Services (23)',
    key: 5,
    children: [
      {
        title: '4 ml contour package',
        label: '1h 30min',
        key: 5.1,
      },
    ],
  },
  {
    title: 'Hair Services (23)',
    key: 6,
    children: [
      {
        title: '4 ml contour package',
        label: '1h 30min',
        key: 6.1,
      },
    ],
  },
]
