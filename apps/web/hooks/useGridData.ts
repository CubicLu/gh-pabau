import clinicalImage from '../assets/images/clinical.png'
import developerImage from '../assets/images/developer.png'
import financialImage from '../assets/images/financial.png'
import marketingImage from '../assets/images/marketing.png'
import clinicImage from '../assets/images/our-clinic.png'
import servicesImage from '../assets/images/services.png'

export function useGridData(t) {
  const setupGridData = [
    {
      title: t('setup.business'),
      keyValue: 'Business',
      subDataTitles: [
        {
          title: t('setup.clinic.bussiness.details'),
          data: [],
          href: '/setup/business-details',
        },
        {
          title: t('setup.clinic.location'),
          data: [],
          href: '/setup/locations',
        },
        {
          title: t('setup.clinic.general.setting'),
          data: [
            {
              title: t('setup.clinic.general.calendar'),
              href: '/settings/calendar',
            },
            {
              title: t('setup.clinic.general.loyalty'),
              href: ' /setup/settings/loyalty',
            },
            {
              title: t('setup.clinic.general.performance'),
              href: '/setup/settings/performance',
            },
            {
              title: t('setup.clinic.general.pos'),
              href: '/setup/settings/pos-configuration',
            },
            {
              title: t('setup.clinic.general.referral'),
              href: '/setup/settings/referral',
            },
          ],
          href: '/setup/settings',
        },
        {
          title: t('setup.clinic.data'),
          data: [
            {
              title: t('setup.clinic.data.custom.field'),
              href: '/setup/custom-fields',
            },
            {
              title: t('setup.clinic.data.imports'),
              href: '/setup/import',
            },
            {
              title: t('setup.clinic.data.labels'),
              href: '',
            },
          ],
        },
        {
          title: t('setup.clinic.subscription'),
          data: [
            {
              title: t('setup.clinic.subscription.billing'),
              href: '/setup/subscription?title=billing',
            },
            {
              title: t('setup.clinic.subscription.billing.details'),
              href: '/setup/subscription?title=invoice',
            },
            {
              title: t('setup.clinic.subscription.addons'),
              href: '/setup/subscription?title=accountinfo',
            },
          ],
        },
      ],
      image: clinicImage,
    },
    {
      title: t('setup.product.service.title'),
      keyValue: 'Services',
      subDataTitles: [
        { title: t('setup.services'), data: [], href: '/setup/services' },
        { title: t('setup.packages'), data: [], href: '/setup/packages' },
        {
          title: t('setup.resources'),
          data: [
            {
              title: t('setup.resources.rooms'),
              href: '/setup/rooms',
            },
            {
              title: t('setup.resources.equipment'),
              href: '/setup/resource',
            },
          ],
        },
        { title: t('setup.booking'), data: [], href: 'setup/online-booking' },
      ],
      image: servicesImage,
    },
    {
      title: t('setup.clinical.title'),
      keyValue: 'Clinical',
      subDataTitles: [
        {
          title: t('setup.clinical.care'),
          data: [],
          href: '/setup/care-pathways',
        },
        {
          title: t('setup.clinical.medical.form'),
          data: [],
          href: '/setup/medical-forms',
        },
        {
          title: t('setup.clinical.diagnostic'),
          data: [],
          href: '/setup/diagnostic',
        },
        { title: t('setup.clinical.labs'), data: [], href: '/setup/labs' },
        { title: t('setup.clinical.drugs'), data: [], href: '/setup/drugs' },
        {
          title: t('setup.clinical.medical'),
          data: [
            {
              title: t('setup.clinical.medical.contraindication'),
              href: '/setup/contraindication',
            },
            {
              title: t('setup.clinical.medical'),
              href: '/setup/medical-conditions',
            },
          ],
        },
        {
          title: t('setup.clinical.vaccine'),
          data: [
            {
              title: t('setup.clinical.vaccines'),
              href: '/setup/vaccines',
            },
            {
              title: t('setup.clinical.diseases'),
              href: '/setup/diseases',
            },
            {
              title: t('setup.clinical.schedule'),
              href: '/setup/vaccine-schedules',
            },
          ],
        },
        {
          title: t('setup.clinical.body'),
          data: [],
          href: '/setup/body-charts',
        },
      ],
      image: clinicalImage,
    },
    {
      title: t('setup.marketing.title'),
      keyValue: 'Marketing & Communication',
      subDataTitles: [
        {
          title: t('setup.marketing.communications'),
          data: [
            {
              title: t('setup.marketing.communications.notification'),
              href: '/client-notifications',
            },
            {
              title: t('setup.marketing.communications.address'),
              href: '/setup/senders',
            },
            {
              title: t('setup.marketing.communications.templates'),
              href: '/setup/communication',
            },
            {
              title: t('setup.marketing.communications.sms.setting'),
              isModal: true,
            },
          ],
          href: '/setup/senders',
        },
        {
          title: t('setup.marketing.client.portal'),
          data: [],
          href: '/setup/client-area',
        },
        {
          title: t('setup.marketing.feedback'),
          data: [],
          href: '/setup/reviews-config',
        },
        {
          title: t('setup.marketing.lead'),
          data: [],
          href: '/setup/lead-forms',
        },
        {
          title: t('setup.marketing.sources'),
          data: [],
          href: '/setup/marketing-sources',
        },
      ],
      image: marketingImage,
    },
    {
      title: t('setup.financials'),
      keyValue: 'Financials',
      subDataTitles: [
        {
          title: t('setup.financials.payment'),
          data: [],
          href: '/setup/payment-processing',
        },
        {
          title: t('setup.financials.discounts'),
          data: [],
          href: '/setup/discounts',
        },
        {
          title: t('setup.financials.taxes'),
          data: [],
          href: '/setup/tax-rate',
        },
        {
          title: t('setup.financials.invoice'),
          data: [],
          href: '/setup/invoice-templates',
        },
        {
          title: t('setup.financials.payment.type'),
          data: [],
          href: '/setup/payment-types',
        },
        {
          title: t('setup.financials.pricing.rules'),
          data: [],
          href: '/setup/contracts',
        },
        {
          title: t('setup.financials.cancellation'),
          data: [],
          href: '/setup/cancel-policy',
        },
      ],
      image: financialImage,
    },
    {
      title: t('setup.developer'),
      keyValue: 'Developer & Other',
      subDataTitles: [
        {
          title: t('setup.developer.webhooks'),
          data: [],
          href: '/setup/webhooks',
        },
        { title: t('setup.developer.API'), data: [], href: '/setup/api' },
        {
          title: t('setup.clinic.integrations'),
          data: [
            {
              title: t('setup.clinic.integrations.connectedApps'),
              href: '',
            },
            {
              title: t('setup.clinic.integrations.marketplace'),
              href: '',
            },
            {
              title: t('setup.clinic.integrations.apiKey'),
              href: '',
            },
            {
              title: t('setup.clinic.integrations.developerHub'),
              href: '',
            },
          ],
          href: '/setup/integration',
        },
        {
          title: t('setup.developer.others'),
          data: [
            {
              title: t('setup.developer.departments'),
              href: '/setup/departments',
            },
            {
              title: t('setup.developer.block'),
              href: '/setup/block-out-options',
            },
            {
              title: t('setup.developer.appointment'),
              href: '/setup/appointment-statuses',
            },
            {
              title: t('setup.activity.types'),
              href: '/setup/activity-types',
            },
            {
              title: t('setup.developer.credit'),
              href: '/setup/credit-notes',
            },
            {
              title: t('setup.developer.petty.cash'),
              href: '/setup/petty-cash',
            },
            {
              title: t('setup.developer.salutations'),
              href: '/setup/salutation',
            },
            {
              title: t('setup.developer.cancellation'),
              href: '/setup/cancellation-reasons',
            },
            {
              title: t('setup.developer.family'),
              href: '/setup/family-relationships',
            },
            {
              title: t('setup.developer.issuing.companies'),
              href: '/setup/issuing-company',
            },
          ],
          href: '',
        },
      ],
      isExpand: false,
      image: developerImage,
    },
  ]

  const getParentSetupData = (routeName) => {
    return setupGridData.filter((thread) =>
      thread.subDataTitles.some((x) => x.href === routeName)
    )
  }

  return { setupGridData, getParentSetupData }
}
