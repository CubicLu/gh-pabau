import {
  faBan,
  faBook,
  faCalendarWeek,
  faClinicMedical,
  faDog,
  faHeadSideMask,
  faMoon,
  faParking,
  faUserMd,
  faVirus,
  faWalking,
} from '@fortawesome/free-solid-svg-icons'

export const getBadgesList = (t) => {
  const badgesList = [
    {
      title: t('setup.location.badge.doctor.onsite'),
      name: 'Doctor Onsite',
      icon: faUserMd,
      selected: false,
    },
    {
      title: t('setup.location.badge.24/7.clinic'),
      name: '24/7 Clinic',
      icon: faClinicMedical,
      selected: false,
    },
    {
      title: t('setup.location.badge.parking.onsite'),
      name: 'Parking onsite',
      icon: faParking,
      selected: false,
    },
    {
      title: t('setup.location.badge.arabic.speaking'),
      name: 'Arabic Speaking',
      icon: faMoon,
      selected: false,
    },
    {
      title: t('setup.location.badge.covid.safe'),
      name: 'COVID-19 Safe',
      icon: faVirus,
      selected: false,
    },
    {
      title: t('setup.location.badge.dog.friendly'),
      name: 'Dog Friendly',
      icon: faDog,
      selected: false,
    },
    {
      title: t('setup.location.badge.disabled.access'),
      name: 'Disabled Access',
      icon: faBan,
      selected: false,
    },
    {
      title: t('setup.location.badge.weekends'),
      name: 'Weekends',
      icon: faCalendarWeek,
      selected: false,
    },
    {
      title: t('setup.location.badge.online.bookings'),
      name: 'Online Bookings',
      icon: faBook,
      selected: false,
    },
    {
      title: t('setup.location.badge.booking.only'),
      name: 'Bookings Only',
      icon: faBook,
      selected: false,
    },
    {
      title: t('setup.location.badge.walk'),
      name: 'Walk Ins',
      icon: faWalking,
      selected: false,
    },
    {
      title: t('setup.location.badge.fack.mask'),
      name: 'Face Mask Required',
      icon: faHeadSideMask,
      selected: false,
    },
  ]
  return { badgesList }
}

export const locationImg =
  'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
