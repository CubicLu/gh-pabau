import clinicImage from '../assets/images/our-clinic.png'
import servicesImage from '../assets/images/services.png'
import clinicalImage from '../assets/images/clinical.png'
import marketingImage from '../assets/images/marketing.png'
import financialImage from '../assets/images/financial.png'
import developerImage from '../assets/images/developer.png'

export function useGridData(t) {
  const setupGridData = [
    {
      title: 'Our clinic',
      keyValue: 'Our clinic',
      subDataTitles: [
        { title: 'Business Details', data: [] },
        { title: 'Users', data: ['Users', 'User Groups'] },
        { title: 'Locations', data: [] },
        {
          title: 'General settings',
          data: [
            'Calendar',
            'Loyalty',
            'Performance',
            'Point of Sale',
            'Referral',
          ],
        },
        { title: 'Integrations', data: [] },
        { title: 'Data', data: ['Custom Fields', 'Data Imports'] },
        { title: 'Pabau Subscription', data: ['Billing Activity', 'Addons'] },
      ],
      image: clinicImage,
    },
    {
      title: 'Services',
      keyValue: 'Services',
      subDataTitles: [
        { title: 'Services', data: [], href: '/setup/services' },
        { title: 'Products', data: [], href: '/setup/products' },
        { title: 'Packages', data: [], href: '/setup/packages' },
        { title: 'Resources', data: ['Rooms', 'Equipment'] },
        { title: 'Online Booking', data: [] },
      ],
      image: servicesImage,
    },
    {
      title: 'Clinical',
      keyValue: 'Clinical',
      subDataTitles: [
        { title: 'Care Pathways', data: [] },
        { title: 'Medical form templates', data: [] },
        { title: 'Diagnostic Codes', data: [] },
        { title: 'Labs', data: [] },
        { title: 'Drugs', data: [] },
        {
          title: 'Medical Conditions',
          data: ['Contraindication', 'Medical Conditions'],
        },
        {
          title: 'Vaccine',
          data: [' Vaccines', 'Diseases', 'Vaccine Schedules'],
        },
        { title: 'Body Charts', data: [] },
      ],
      image: clinicalImage,
    },
    {
      title: 'Marketing & Communication',
      keyValue: 'Marketing & Communication',
      subDataTitles: [
        {
          title: 'Communications',
          data: [
            'Client Notifications',
            'Sender Addresses',
            'Templates',
            'SMS Bundles & Settings',
          ],
        },
        { title: 'Client Portal', data: [] },
        { title: 'Feedback Survey', data: [] },
        { title: 'Lead Forms', data: [] },
        {
          title: t('marketingsource-title'),
          data: [],
          href: '/setup/marketing-sources',
        },
      ],
      image: marketingImage,
    },
    {
      title: 'Financials',
      keyValue: 'Financials',
      subDataTitles: [
        {
          title: 'Payment Processing',
          data: [],
          href: '/setup/payment-processing',
        },
        { title: 'Discounts', data: [], href: '/setup/discounts' },
        { title: 'Taxes', data: [] },
        { title: 'Invoice Templates', data: [] },
        { title: 'Payment Types', data: [], href: '/setup/payment-types' },
        { title: 'Contract Pricing', data: [] },
        { title: 'Cancellation Policy', data: [] },
      ],
      image: financialImage,
    },
    {
      title: 'Developer & Other',
      keyValue: 'Developer & Other',
      subDataTitles: [
        { title: 'Webhooks', data: [] },
        { title: 'API keys', data: [] },
        { title: 'Credit Note Types', data: [] },
        { title: 'Departments', data: [] },
        { title: 'Field Capture Labels', data: [] },
        { title: 'Block Out Options', data: [] },
        { title: 'Appointment Statuses', data: [] },
        { title: 'Lead Groups', data: [] },
        { title: 'Petty Cash Types', data: [] },
      ],
      expandTitle: [
        { title: 'Webhooks', data: [] },
        { title: 'API keys', data: [] },
        { title: 'Credit Note Types', data: [] },
        { title: 'Salutations', data: [] },
        { title: 'Training titles', data: [] },
        { title: 'Titles', data: [] },
        { title: 'Photo Uploader', data: [] },
        { title: 'Cancellation Reasons', data: [] },
        { title: 'Lead views', data: [] },
        { title: 'Lead groups', data: [] },
        { title: 'Lead assignment rules', data: [] },
        { title: 'Family relationships', data: [] },
        { title: 'Doc label manager', data: [] },
        { title: 'Departments', data: [] },
        { title: 'Invoice distribution', data: [] },
        { title: 'Issuing companies', data: [] },
        { title: 'Job statues', data: [] },
        { title: 'Supplier categories', data: [] },
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
