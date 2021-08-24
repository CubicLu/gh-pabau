import xero from '../assets/images/xero.svg'
import mailchimp from '../assets/images/mailchimp.svg'
import july17 from '../assets/images/july17.svg'
import stripe from '../assets/images/stripe.svg'
import gocardless from '../assets/images/gocardless.svg'
import healthcode from '../assets/images/healthcode.svg'
import SAP from '../assets/images/sap.svg'
import treatwell from '../assets/images/treatwell.svg'
import BNF from '../assets/images/bnf.svg'
import Doctolib from '../assets/images/doctolib.svg'
import RingCenral from '../assets/images/ringCenral.svg'
import Ometria from '../assets/images/ometria.svg'
import message from '../assets/images/message.svg'
import send from '../assets/images/send.svg'
import inbox from '../assets/images/inbox.svg'
import integrationUser from '../assets/images/integrationUser.svg'
import vaccine from '../assets/images/vaccine.png'
import nathnac from '../assets/images/nathnac-logo.png'
import hospital from '../assets/images/hospital.svg'
import doctorLab from '../assets/images/doctorsLab1.png'

export const setupIntegrationData = (t) => {
  const integrationBodyCollections = [
    {
      key: 0,
      title: t('integration.xero'),
      subTitle: t('integration.software.system'),
      logoImage: xero,
      installed: 0,
      categories: ['FINANCIAL', 'POPULAR'],
    },
    {
      key: 1,
      title: t('integration.mailchimp'),
      subTitle: t('interation.marketing.efforts'),
      logoImage: mailchimp,
      installed: 1,
      categories: ['POPULAR', 'MARKETING'],
    },
    {
      key: 2,
      title: t('integration.ical.integration'),
      subTitle: t('integration.keep.your.life'),
      logoImage: july17,
      installed: 0,
      categories: ['POPULAR', 'BOOKINGS'],
    },
    {
      key: 3,
      title: t('integration.stripe.integration'),
      subTitle: t('integration.extend.your.stripe'),
      logoImage: stripe,
      installed: 0,
      categories: ['POPULAR', 'FINANCIAL'],
    },
    {
      key: 4,
      title: t('integration.cardless'),
      subTitle: t('integration.medically.led'),
      logoImage: gocardless,
      installed: 0,
      categories: ['POPULAR', 'FINANCIAL'],
    },
    {
      key: 5,
      title: t('integration.healthcode'),
      subTitle: t('integration.link.insurance'),
      logoImage: healthcode,
      installed: 0,
      categories: ['FINANCIAL'],
    },
    {
      key: 6,
      title: t('integration.sap'),
      subTitle: t('integration.configure.pabau'),
      logoImage: SAP,
      installed: 0,
      categories: ['FINANCIAL'],
    },
    {
      key: 7,
      title: t('integration.treatwell'),
      subTitle: t('integration.pabau.dairy'),
      logoImage: treatwell,
      installed: 0,
      categories: ['BOOKINGS'],
    },
    {
      key: 8,
      title: t('integration.bnf'),
      subTitle: t('integration.drug.search'),
      logoImage: BNF,
      installed: 0,
      categories: ['MARKETING'],
    },
    {
      key: 9,
      title: t('integration.doctolib'),
      subTitle: 'integration.online.bookings',
      logoImage: Doctolib,
      installed: 0,
      categories: ['BOOKINGS'],
    },
    {
      key: 10,
      title: t('integration.ringcenral'),
      subTitle: t('integration.link.pabau'),
      logoImage: RingCenral,
      installed: 0,
      categories: ['MARKETING'],
    },
    {
      key: 11,
      title: t('integration.ometria'),
      subTitle: t('integration.will.enable'),
      logoImage: Ometria,
      installed: 0,
      categories: ['MARKETING'],
    },
    {
      key: 12,
      title: t('integration.doctors.lab'),
      subTitle: t('integration.doctors.laboratory'),
      logoImage: doctorLab,
      installed: 0,
      categories: ['POPULAR', 'LABS'],
    },
    {
      key: 13,
      title: t('integration.vaccine'),
      subTitle: t('integration.vaccine.module'),
      logoImage: vaccine,
      installed: 0,
      categories: ['VACCINATION'],
    },
    {
      key: 14,
      title: t('integration.nathnac'),
      subTitle: t('integration.link.nathnac'),
      logoImage: nathnac,
      installed: 0,
      categories: ['VACCINATION'],
    },
    {
      key: 15,
      title: t('integration.hospital'),
      subTitle: t('integration.pabau.hospital.module'),
      logoImage: hospital,
      installed: 0,
      categories: ['BOOKINGS'],
    },
  ]
  const worksWith = [
    {
      key: 0,
      title: t('integration.Outbound'),
      subTitle: t('integration.outbound.messages'),
      logoImage: send,
    },
    {
      key: 1,
      title: t('integration.messenger'),
      subTitle: t('integration.messenger.home'),
      logoImage: message,
    },
    {
      key: 2,
      title: t('integration.inbox'),
      subTitle: t('integration.conversation'),
      logoImage: inbox,
    },
    {
      key: 3,
      title: t('integration.operator'),
      subTitle: t('integration.follow.up'),
      logoImage: integrationUser,
    },
  ]

  const tabMenuItems = [
    {
      tabbedTitle: 'Manage',
      tabTitle: t('integration.tabtitle.manage'),
      key: '0',
      disable: true,
    },
    {
      tabbedTitle: 'Your installed apps',
      tabTitle: t('integration.tabtitle.manage.installed-app'),
      key: '1',
      disable: false,
      category: 'ALL',
      installed: 1,
    },
    {
      tabbedTitle: 'Features',
      tabTitle: t('integration.tabtitle.manage.features'),
      key: '2',
      disable: true,
    },
    {
      tabbedTitle: 'All Collections',
      tabTitle: t('integration.tabtitle.manage.collections'),
      key: '3',
      disable: false,
      category: 'ALL',
      limit: 6,
    },
    {
      tabbedTitle: 'Popular',
      tabTitle: t('integration.tabtitle.popular'),
      key: '4',
      disable: false,
      category: 'Popular',
    },
    {
      tabbedTitle: 'Financial',
      tabTitle: t('integration.tabtitle.financial'),
      key: '5',
      disable: false,
      category: 'FINANCIAL',
    },
    {
      tabbedTitle: 'Bookings',
      tabTitle: t('integration.tabtitle.bookings'),
      key: '6',
      disable: false,
      category: 'Bookings',
    },
    {
      tabbedTitle: 'Labs',
      tabTitle: t('integration.tabtitle.labs'),
      key: '7',
      disable: false,
      category: 'Labs',
    },
    {
      tabbedTitle: 'Marketing',
      tabTitle: t('integration.tabtitle.marketing'),
      key: '8',
      disable: false,
      category: 'Marketing',
    },
    {
      tabbedTitle: 'Vaccination',
      tabTitle: t('integration.tabtitle.vaccination'),
      key: '9',
      disable: false,
      category: 'Vaccination',
    },
  ]

  const allCollectionsHeaderCollections = [
    {
      key: 0,
      title: t('integration.third.party.survey'),
      route: '/',
      backColor: '/',
    },
    {
      key: 1,
      title: t('integration.built.pabau'),
      route: '/',
      backColor: '/',
    },
    {
      key: 2,
      title: t('integeration.superchange.data'),
      route: '/',
      backColor: '/',
    },
  ]
  const longDescription = t('integration.long.description')
  const mobileViewDescription = t('integration.mobile.view.description')
  const webViewDescription = t('integration.web.view.description')

  return {
    allCollectionsHeaderCollections,
    tabMenuItems,
    integrationBodyCollections,
    worksWith,
    longDescription,
    mobileViewDescription,
    webViewDescription,
  }
}
