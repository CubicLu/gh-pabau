import img1 from '../assets/images/back.png'
import img2 from '../assets/images/chin.png'
import img3 from '../assets/images/Chest.png'
import img4 from '../assets/images/Lip.png'
import Mois from '../assets/images/product.png'
import Helico from '../../../libs/ui/src/assets/images/Heliocare.jpg'
import sup from '../../../libs/ui/src/assets/images/super-c30.jpg'
export const tooltip =
  'This package will give you credits to book two appointments: a Baseline scan with face-to-face consultation and a follow-up Progress scan.\n' +
  'IMPORTANT: The credits will expire one year from the date of purchase and the two scans must be a minimum of eight weeks apart.'

export const data = [
  {
    key: 1,
    name: 'Laser / Back',
    oldprice: '960',
    newprice: 400,
    image: img1,
    active: false,
  },
  {
    key: 2,
    name: 'Laser / Chin',
    oldprice: '260',
    newprice: 620,
    image: img2,
    active: false,
  },
  {
    key: 3,
    name: 'Laser / Chest',
    oldprice: '960',
    newprice: 830,
    image: img3,
    active: false,
  },
  {
    key: 4,
    name: 'Laser / Lip',
    oldprice: '450',
    newprice: 120,
    image: img4,
    active: false,
  },
]
export const normaldata = [
  {
    key: 1,
    name: 'Embryolisse Moisturizers',
    active: false,
    price: 60,
    image: Mois,
  },
  {
    key: 2,
    name: 'Heliocare-360-Gel',
    active: false,
    price: 100,
    image: Helico,
  },
  {
    key: 3,
    name: 'super c30',
    active: false,
    price: 180,
    image: sup,
  },
  {
    key: 4,
    name: 'Hydra B5',
    active: false,
    price: 120,
    image: sup,
  },
]
