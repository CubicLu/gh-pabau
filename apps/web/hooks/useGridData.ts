import clinicalImage from '../assets/images/clinical.png'
import developerImage from '../assets/images/developer.png'
import financialImage from '../assets/images/financial.png'
import marketingImage from '../assets/images/marketing.png'
import clinicImage from '../assets/images/our-clinic.png'
import servicesImage from '../assets/images/services.png'

export function useGridData(t) {
  const setupGridData = [
    {
      title: t('setup.clinic'),
      keyValue: 'Our clinic',
      subDataTitles: [
        {
          title: t('setup.clinic.bussiness.details'),
          data: [],
          href: '/setup/business-details',
        },
        {
          title: t('setup.clinic.user'),
          data: [
            {
              title: t('setup.clinic.user'),
              href: '/team/users',
            },
            {
              title: t('setup.clinic.user.group'),
              href: '/team/users?title=groups',
            },
          ],
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
              href: '/calendar',
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
          title: t('setup.clinic.integrations'),
          data: [],
          href: '/setup/integration',
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
        { title: t('setup.product'), data: [], href: '/products/list' },
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
          title: t('setup.financials.contract'),
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
          title: t('setup.developer.credit'),
          data: [],
          href: '/setup/credit-notes',
        },
        {
          title: t('setup.developer.departments'),
          data: [],
          href: '/setup/departments',
        },
        {
          title: t('setup.developer.block'),
          data: [],
          href: '/setup/block-out-options',
        },
        {
          title: t('setup.developer.appointment'),
          data: [],
          href: '/setup/appointment-statuses',
        },
        {
          title: t('setup.developer.lead'),
          data: [],
          href: '/setup/lead-groups',
        },
        {
          title: t('setup.developer.petty.cash'),
          data: [],
          href: '/setup/petty-cash',
        },
      ],
      expandTitle: [
        {
          title: t('setup.developer.salutations'),
          data: [],
          href: '/setup/salutation',
        },
        {
          title: t('setup.developer.training'),
          data: [],
          href: '/setup/training-titles',
        },
        {
          title: t('setup.developer.cancellation'),
          data: [],
          href: '/setup/cancellation-reasons',
        },
        {
          title: t('setup.developer.lead.views'),
          data: [],
          href: '/setup/lead-views',
        },
        {
          title: t('setup.developer.lead.assignment'),
          data: [],
          href: ' /setup/lead-assignment-rules',
        },
        {
          title: t('setup.developer.family'),
          data: [],
          href: '/setup/family-relationships',
        },
        {
          title: t('setup.developer.issuing.companies'),
          data: [],
          href: '/setup/issuing-company',
        },
      ],
      isExpand: true,
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
