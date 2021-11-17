import img from '../assets/images/emp_moal.png'
import blue from '../assets/images/blue.png'
import purple from '../assets/images/purple.png'
export const data = [
  {
    key: 1,
    name: 'Jack Sparrow',
    rating: 5,
    month: 2,
    description: 'Test review',
    source: img,
  },
]

export const voucherData = [
  {
    key: 1,
    value: '100',
    valueDescription: 'Voucher value',
    type: 'Family',
    description: 'Redeem on all services',
    size: '100',
    sizeDescription: '',
    price: 50,
    image: blue,
    active: false,
  },
  {
    key: 2,
    value: '100',
    valueDescription: 'Voucher value',
    type: 'Family',
    description: 'Redeem on all services',
    size: '100',
    sizeDescription: '',
    price: 100,
    image: purple,
    active: false,
  },
]
