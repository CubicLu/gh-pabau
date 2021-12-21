import BodyHead from '../assets/images/body/head.svg'
import BodyHair from '../assets/images/body/hair.svg'
import BodyForeHead from '../assets/images/body/forehead.svg'
import BodyEye from '../assets/images/body/eye.svg'
import BodyNose from '../assets/images/body/nose.svg'
import BodyEar from '../assets/images/body/ear.svg'
import BodyCheeks from '../assets/images/body/cheeks.svg'
import BodyLips from '../assets/images/body/lips.svg'
import BodyTeeth from '../assets/images/body/teeth.svg'
import BodyChin from '../assets/images/body/chin.svg'
import BodyNeck from '../assets/images/body/neck.svg'
import BodyBack from '../assets/images/body/back.svg'
import BodyChest from '../assets/images/body/chest.svg'
import BodyArm from '../assets/images/body/arm.svg'
import BodyStomach from '../assets/images/body/stomach.svg'
import BodyButtocks from '../assets/images/body/buttocks.svg'
import BodyWoman from '../assets/images/body/woman.svg'
import BodyMan from '../assets/images/body/man.svg'
import BodyLeg from '../assets/images/body/leg.svg'
import { ReactComponent as Product } from '../assets/images/product-sell.svg'
import { ReactComponent as Course1 } from '../assets/images/course1.svg'
import { ReactComponent as Course2 } from '../assets/images/course2.svg'
import { ReactComponent as Course3 } from '../assets/images/course3.svg'
import { ReactComponent as Course4 } from '../assets/images/course4.svg'
import {
  faClinicMedical,
  faUserMd,
  faVirus,
} from '@fortawesome/free-solid-svg-icons'

export const appointmentColors = [
  '#7986cb',
  '#64b5f6',
  '#4dd0e1',
  '#9575cd',
  '#ba68c8',
  '#d46bd4',
  '#ff679b',
  '#fff176',
  '#a1887f',
  '#4db6ac',
  '#81c784',
  '#90a4ae',
  '#ffc38e',
  '#d2a3a3',
]

export const addColors = [
  '#FF5B64',
  '#FF737A',
  '#FF8C92',
  '#FFA6AA',
  '#FFBFC3',
  '#FFD9DB',
  '#ED72AA',
  '#ED89B7',
  '#F5A6CA',
  '#F5B5D2',
  '#F5C4DA',
  '#FAD4E5',
  '#7A61E1',
  '#8C77E1',
  '#A491F2',
  '#BEB1F2',
  '#C7BDF2',
  '#D1C9F2',
  '#1F75D5',
  '#398BE6',
  '#529AEB',
  '#6AA7EB',
  '#81B3EB',
  '#B6D2F2',
  '#54B2D3',
  '#67C5E6',
  '#81CFEB',
  '#9CDAF0',
  '#B4E0F0',
  '#C9E8F2',
  '#65CC97',
  '#77D9A7',
  '#90DEB6',
  '#A8E6C6',
  '#BCEBD2',
  '#CEF2E0',
  '#39EE0C',
  '#74F355',
  '#92F679',
  '#ADF999',
  '#C7FBBA',
  '#D7FCCE',
  '#FAAD14',
  '#FFC247',
  '#FFD37A',
  '#FFDB94',
  '#FFE4AD',
  '#FFECC7',
  '#C07A3A',
  '#CC8C52',
  '#CC9766',
  '#D1A67D',
  '#E0BD9D',
  '#E6CEB8',
  '#9191A1',
  '#A1A1B2',
  '#B8B8CC',
  '#C5C5D4',
  '#D1D1DE',
  '#DFDFEB',
]

export const weekDays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

export const productPaginateData = {
  total: 50,
  offset: 1,
  limit: 10,
  currentPage: 51,
  showingRecords: 10,
  defaultPageSize: 10,
  showSizeChanger: false,
}

export const servicePaginateData = {
  total: 50,
  offset: 1,
  limit: 10,
  currentPage: 51,
  showingRecords: 10,
  defaultPageSize: 10,
  showSizeChanger: false,
}

export const employees = [
  { id: 1, name: 'Jessica Winter', selected: false },
  { id: 2, name: 'Jeff Hackley', selected: false },
  { id: 3, name: 'Alexander Wang', selected: false },
  { id: 4, name: 'Linda Davis', selected: false },
  { id: 5, name: 'William Tyson', selected: false },
  { id: 6, name: 'Max Starck', selected: false },
  { id: 7, name: 'Kyle Walsh', selected: false },
  { id: 8, name: 'Owen Phillips', selected: false },
  { id: 9, name: 'Aidan Kelly', selected: false },
  { id: 10, name: 'Ewan Morgan', selected: false },
  { id: 11, name: 'Jordan Martin', selected: false },
  { id: 12, name: 'Grant Dudley', selected: false },
]

export const rooms = ['Botox', ' Theraphy', 'Massage', 'Lab']

export const equipment = [
  'Equipment A',
  'Equipment B',
  'Equipment C',
  'Equipment D',
  'Equipment E',
  'Equipment F',
  'Equipment G',
]

export const bookingDays = [
  {
    weekDay: 'Mon',
    isAvailable: false,
  },
  {
    weekDay: 'Tue',
    isAvailable: false,
  },
  {
    weekDay: 'Wed',
    isAvailable: false,
  },
  {
    weekDay: 'Thu',
    isAvailable: false,
  },
  {
    weekDay: 'Fri',
    isAvailable: false,
  },
  {
    weekDay: 'Sat',
    isAvailable: false,
  },
  {
    weekDay: 'Sun',
    isAvailable: false,
  },
]

export const onlineBookingTabs = [
  'settingstab',
  'productupselltab',
  'courseupselltab',
  'servicecrossselltab',
  'photouploadingtab',
  'promotiontab',
]

export const nameSkeleton = ['nameSkeleton', 'timeSkeleton']

export const rateSkeleton = ['ratingSkeleton', 'priceSkeleton']

export const getImages = (list, t) => {
  const contracts = list.map((item) => {
    return {
      logo: item.img,
      key: t(
        `setup.services.servicestab.contracts.${item.name
          .toLowerCase()
          .replace(/\s+/g, '')}`
      ),
      name: item.name,
      type: t('setup.services.servicestab.contracts.type.insurance'),
    }
  })
  return {
    contracts,
  }
}

export const get = (t) => {
  const categories = [
    {
      groupTitle: t(
        'setup.services.servicestab.createmodal.general.category.optionstitle'
      ),
      groupItems: [
        t(
          'setup.services.servicestab.createmodal.general.category.options.japanesestraightening'
        ),
        t(
          'setup.services.servicestab.createmodal.general.category.options.haircutsandhairdressing'
        ),
        t(
          'setup.services.servicestab.createmodal.general.category.options.hairtransplants'
        ),
      ],
    },
  ]

  const durations = []
  let hour = 0,
    min = 0
  let hours, mins
  for (let i = 0; i < 24; i = i + 1) {
    min = min + 5
    if (min === 60) {
      hour = hour + 1
      min = 0
    }
    if (hour.toString().length <= 1) {
      hours = '0' + hour.toString()
    } else {
      hours = hour
    }
    if (min.toString().length <= 1) {
      mins = '0' + min.toString()
    } else {
      mins = min
    }
    durations.push({
      title: t(
        `setup.services.servicestab.createmodal.pricing.duration.${
          hour > 0
            ? min === 0
              ? hour + 'h'
              : hour + 'h' + min + 'min'
            : min + 'min'
        }`
      ),
      value: hours.toString() + ':' + mins.toString(),
    })
  }

  const pricingOptions = [
    {
      title: t(
        'setup.services.servicestab.createmodal.pricing.pricingoptions.book&sell'
      ),
      value: 'Book & Sell',
      isBook: true,
      isSell: true,
      selected: true,
    },
    {
      title: t(
        'setup.services.servicestab.createmodal.pricing.pricingoptions.book'
      ),
      value: 'Book',
      isBook: true,
      isSell: false,
      selected: false,
    },
    {
      title: t(
        'setup.services.servicestab.createmodal.pricing.pricingoptions.sell'
      ),
      value: 'Sell',
      isBook: false,
      isSell: true,
      selected: false,
    },
  ]

  const paymentProcessing = [
    {
      type: t(
        'setup.services.servicestab.createmodal.pricing.deposits&onlinepayments.paymenttype.amount'
      ),
      value: 'Amount',
      selected: false,
    },
    {
      type: t(
        'setup.services.servicestab.createmodal.pricing.deposits&onlinepayments.paymenttype.percent'
      ),
      value: 'Percent',
      selected: true,
    },
  ]

  const patientBookings = [
    {
      title: t(
        'setup.services.servicestab.createmodal.onlinebooking.patientbookings.existing&new'
      ),
      type: 'Existing & New',
      selected: true,
    },
    {
      title: t(
        'setup.services.servicestab.createmodal.onlinebooking.patientbookings.existing'
      ),
      type: 'Existing',
      selected: false,
    },
    {
      title: t(
        'setup.services.servicestab.createmodal.onlinebooking.patientbookings.new'
      ),
      type: 'New',
      selected: false,
    },
  ]

  const bodyHeadAndNeck = [
    {
      name: t(
        'setup.services.servicestab.createmodal.onlinebooking.photouploading.face'
      ),
      src: BodyHead,
      selected: true,
    },
    {
      name: t(
        'setup.services.servicestab.createmodal.onlinebooking.photouploading.hair'
      ),
      src: BodyHair,
      selected: false,
    },
    {
      name: t(
        'setup.services.servicestab.createmodal.onlinebooking.photouploading.Forehead'
      ),
      src: BodyForeHead,
      selected: false,
    },
    {
      name: t(
        'setup.services.servicestab.createmodal.onlinebooking.photouploading.eyes'
      ),
      src: BodyEye,
      selected: false,
    },
    {
      name: t(
        'setup.services.servicestab.createmodal.onlinebooking.photouploading.nose'
      ),
      src: BodyNose,
      selected: false,
    },
    {
      name: t(
        'setup.services.servicestab.createmodal.onlinebooking.photouploading.ears'
      ),
      src: BodyEar,
      selected: false,
    },
    {
      name: t(
        'setup.services.servicestab.createmodal.onlinebooking.photouploading.cheeks'
      ),
      src: BodyCheeks,
      selected: false,
    },
    {
      name: t(
        'setup.services.servicestab.createmodal.onlinebooking.photouploading.lips&cheeks'
      ),
      src: BodyLips,
      selected: false,
    },
    {
      name: t(
        'setup.services.servicestab.createmodal.onlinebooking.photouploading.teeth&smile'
      ),
      src: BodyTeeth,
      selected: false,
    },
    {
      name: t(
        'setup.services.servicestab.createmodal.onlinebooking.photouploading.chin'
      ),
      src: BodyChin,
      selected: false,
    },
    {
      name: t(
        'setup.services.servicestab.createmodal.onlinebooking.photouploading.neck&throat'
      ),
      src: BodyNeck,
      selected: false,
    },
  ]

  const bodyParts = [
    {
      name: t(
        'setup.services.servicestab.createmodal.onlinebooking.photouploading.wholebody'
      ),
      src: BodyBack,
      selected: false,
    },
    {
      name: t(
        'setup.services.servicestab.createmodal.onlinebooking.photouploading.chest&breasts'
      ),
      src: BodyChest,
      selected: false,
    },
    {
      name: t(
        'setup.services.servicestab.createmodal.onlinebooking.photouploading.arms&hands'
      ),
      src: BodyArm,
      selected: false,
    },
    {
      name: t(
        'setup.services.servicestab.createmodal.onlinebooking.photouploading.stomach'
      ),
      src: BodyStomach,
      selected: false,
    },
    {
      name: t(
        'setup.services.servicestab.createmodal.onlinebooking.photouploading.butt'
      ),
      src: BodyButtocks,
      selected: false,
    },
    {
      name: t(
        'setup.services.servicestab.createmodal.onlinebooking.photouploading.female'
      ),
      src: BodyWoman,
      selected: false,
    },
    {
      name: t(
        'setup.services.servicestab.createmodal.onlinebooking.photouploading.male'
      ),
      src: BodyMan,
      selected: false,
    },
    {
      name: t(
        'setup.services.servicestab.createmodal.onlinebooking.photouploading.legs'
      ),
      src: BodyLeg,
      selected: false,
    },
  ]

  const locations = [
    {
      id: 1,
      location: t('setup.services.servicestab.locations.thelondonclinic'),
      value: 'The London Clinic',
      detail: t('setup.services.servicestab.locations.thelondonclinic.detail'),
      badges: [faUserMd, faClinicMedical, faVirus],
      selected: false,
    },
    {
      id: 2,
      location: t('setup.services.servicestab.locations.sloanmedical'),
      value: 'Sloan Medical Centre',
      detail: t('setup.services.servicestab.locations.sloanmedical.detail'),
      badges: [faUserMd, faVirus],
      selected: false,
    },
    {
      id: 3,
      location: t('setup.services.servicestab.locations.sheffieldpharmacy'),
      value: 'Sheffield Late Night Pharmacy',
      detail: t(
        'setup.services.servicestab.locations.sheffieldpharmacy.detail'
      ),
      badges: [faClinicMedical],
      selected: false,
    },
  ]

  const services = [
    t('setup.services.servicestab.filter.seasonaloffers'),
    t('setup.services.servicestab.filter.thebeauty&skinclinicprepaid'),
  ]
  const togglesViews = [
    t('setup.services.servicestab.toggle.standardview'),
    t('setup.services.servicestab.toggle.detailedview'),
  ]

  const LeftTabs = [
    'All',
    'Appointments',
    t('setup.services.servicestab.enrollments'),
    t('setup.services.servicestab.arrival'),
    t('setup.services.servicestab.pricing'),
    t('setup.services.servicestab.contracts'),
    t('setup.services.servicestab.injectables'),
  ]

  return {
    categories,
    pricingOptions,
    paymentProcessing,
    patientBookings,
    bodyHeadAndNeck,
    bodyParts,
    durations,
    locations,
    services,
    togglesViews,
    LeftTabs,
  }
}

export const recommendedProductList = [
  {
    id: 1,
    src: Product,
    name: 'Embryolisse Moisturizers',
    price: '£80',
    rate: 5,
  },
  {
    id: 2,
    src: Product,
    name: 'Embryolisse Moisturizers',
    price: '£80',
    rate: 4.5,
  },
  {
    id: 3,
    src: Product,
    name: 'Embryolisse Moisturizers',
    price: '£80',
    rate: 3.5,
  },
  {
    id: 4,
    src: Product,
    name: 'Embryolisse Moisturizers',
    price: '£80',
    rate: 5,
  },
]

export const recommendedCourseList = [
  {
    id: 1,
    src: Course1,
    name: 'Laser / Back',
    originalPrice: '£760',
    price: '£380',
    rate: 5,
  },
  {
    id: 2,
    src: Course2,
    name: 'Laser / Chin',
    originalPrice: '£760',
    price: '£380',
    rate: 4.5,
  },
  {
    id: 3,
    src: Course3,
    name: 'Laser / Chest',
    originalPrice: '£760',
    price: '£380',
    rate: 3.5,
  },
  {
    id: 4,
    src: Course4,
    name: 'Laser / Lip',
    originalPrice: '£760',
    price: '£380',
    rate: 5,
  },
]

export const recommendedServiceList = [
  {
    id: 1,
    src: Course1,
    name: 'Back Massage',
    price: '£80',
    rate: 5,
  },
  {
    id: 2,
    src: Course2,
    name: 'Face Massage',
    price: '£80',
    rate: 4.5,
  },
  {
    id: 3,
    src: Course3,
    name: 'Full Body Massage',
    price: '£80',
    rate: 3.5,
  },
  {
    id: 4,
    src: Course4,
    name: 'Face Massage',
    price: '£80',
    rate: 5,
  },
]

export const productData = [
  {
    name: 'Embryolisse Moisturizers',
    image: Product,
    verified: false,
  },
  {
    name: 'Embryolisse Moisturizers',
    image: Product,
    verified: false,
  },
  {
    name: 'Embryolisse Moisturizers',
    image: Product,
    verified: false,
  },
  {
    name: 'Embryolisse Moisturizers',
    image: Product,
    verified: false,
  },
  {
    name: 'Embryolisse Moisturizers',
    image: Product,
    verified: false,
  },
  {
    name: 'Embryolisse Moisturizers',
    image: Product,
    verified: false,
  },
  {
    name: 'Embryolisse Moisturizers',
    image: Product,
    verified: false,
  },
  {
    name: 'Embryolisse Moisturizers',
    image: Product,
    verified: false,
  },
  {
    name: 'Embryolisse Moisturizers',
    image: Product,
    verified: true,
  },
  {
    name: 'Embryolisse Moisturizers',
    image: Product,
    verified: false,
  },
  {
    name: 'Embryolisse Moisturizers',
    image: Product,
    verified: false,
  },
]

export const servicesData = [
  {
    name: 'Back Massage',
    image: Course1,
    verified: true,
  },
  {
    name: 'Face Massage',
    image: Course2,
    verified: false,
  },
  {
    name: 'Full Body Massage',
    image: Course3,
    verified: false,
  },
  {
    name: 'Face Massage',
    image: Course4,
    verified: false,
  },
  {
    name: 'Back Massage',
    image: Course1,
    verified: false,
  },
  {
    name: 'Face Massage',
    image: Course2,
    verified: false,
  },
  {
    name: 'Full Body Massage',
    image: Course3,
    verified: false,
  },
  {
    name: 'Face Massage',
    image: Course4,
    verified: false,
  },
  {
    name: 'Back Massage',
    image: Course1,
    verified: false,
  },
  {
    name: 'Face Massage',
    image: Course2,
    verified: false,
  },
  {
    name: 'Full Body Massage',
    image: Course3,
    verified: false,
  },
]

export const courseUpsellImages = [
  { course: Course1 },
  { course: Course2 },
  { course: Course3 },
  { course: Course4 },
]
