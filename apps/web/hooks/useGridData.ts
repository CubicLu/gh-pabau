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
          data: [t('setup.clinic.user'), t('setup.clinic.user.group')],
        },
        { title: t('setup.clinic.location'), data: [] },
        {
          title: t('setup.clinic.general.setting'),
          data: [
            t('setup.clinic.general.calendar'),
            t('setup.clinic.general.loyalty'),
            t('setup.clinic.general.performance'),
            t('setup.clinic.general.pos'),
            t('setup.clinic.general.referral'),
          ],
          href: '/setup/settings',
        },
        { title: t('setup.clinic.integrations'), data: [] },
        {
          title: t('setup.clinic.data'),
          data: [
            t('setup.clinic.data.custom.field'),
            t('setup.clinic.data.imports'),
          ],
        },
        {
          title: t('setup.clinic.subscription'),
          data: [
            t('setup.clinic.subscription.billing'),
            t('setup.clinic.subscription.addons'),
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
        { title: t('setup.product'), data: [], href: '/setup/products' },
        { title: t('setup.packages'), data: [], href: '/setup/packages' },
        {
          title: t('setup.resources'),
          data: [t('setup.resources.rooms'), t('setup.resources.equipment')],
        },
        { title: t('setup.booking'), data: [] },
      ],
      image: servicesImage,
    },
    {
      title: t('setup.clinical.title'),
      keyValue: 'Clinical',
      subDataTitles: [
        { title: t('setup.clinical.care'), data: [] },
        { title: t('setup.clinical.medical.form'), data: [] },
        { title: t('setup.clinical.diagnostic'), data: [] },
        { title: t('setup.clinical.labs'), data: [] },
        { title: t('setup.clinical.drugs'), data: [] },
        {
          title: t('setup.clinical.medical'),
          data: [
            t('setup.clinical.medical.contraindication'),
            t('setup.clinical.medical'),
          ],
        },
        {
          title: t('setup.clinical.vaccine'),
          data: [
            t('setup.clinical.vaccines'),
            t('setup.clinical.diseases'),
            t('setup.clinical.schedule'),
          ],
        },
        { title: t('setup.clinical.body'), data: [] },
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
            t('setup.marketing.communications.notification'),
            t('setup.marketing.communications.address'),
            t('setup.marketing.communications.templates'),
            t('setup.marketing.communications.sms.setting'),
          ],
          href: '/setup/senders',
        },
        { title: t('setup.marketing.client.portal'), data: [] },
        { title: t('setup.marketing.feedback'), data: [] },
        { title: t('setup.marketing.lead'), data: [] },
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
        { title: t('setup.financials.taxes'), data: [] },
        { title: t('setup.financials.invoice'), data: [] },
        {
          title: t('setup.financials.payment.type'),
          data: [],
          href: '/setup/payment-types',
        },
        { title: t('setup.financials.contract'), data: [] },
        { title: t('setup.financials.cancellation'), data: [] },
      ],
      image: financialImage,
    },
    {
      title: t('setup.developer'),
      keyValue: 'Developer & Other',
      subDataTitles: [
        { title: t('setup.developer.webhooks'), data: [] },
        { title: t('setup.developer.API'), data: [] },
        { title: t('setup.developer.credit'), data: [] },
        { title: t('setup.developer.departments'), data: [] },
        { title: t('setup.developer.field'), data: [] },
        { title: t('setup.developer.block'), data: [] },
        { title: t('setup.developer.appointment'), data: [] },
        { title: t('setup.developer.lead'), data: [] },
        { title: t('setup.developer.petty.cash'), data: [] },
      ],
      expandTitle: [
        { title: t('setup.developer.webhooks'), data: [] },
        { title: t('setup.developer.API'), data: [] },
        { title: t('setup.developer.credit'), data: [] },
        { title: t('setup.developer.salutations'), data: [] },
        { title: t('setup.developer.training'), data: [] },
        { title: t('setup.developer.titles'), data: [] },
        { title: t('setup.developer.photo'), data: [] },
        { title: t('setup.developer.cancellation'), data: [] },
        { title: t('setup.developer.lead.views'), data: [] },
        { title: t('setup.developer.lead.group'), data: [] },
        { title: t('setup.developer.lead.assignment'), data: [] },
        { title: t('setup.developer.family'), data: [] },
        { title: t('setup.developer.doc'), data: [] },
        { title: t('setup.developer.departments'), data: [] },
        { title: t('setup.developer.invoice.distribution'), data: [] },
        { title: t('setup.developer.issuing.companies'), data: [] },
        { title: t('setup.developer.job.status'), data: [] },
        { title: t('setup.developer.supplier.categories'), data: [] },
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
