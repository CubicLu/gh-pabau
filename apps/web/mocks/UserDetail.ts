import { TFunction } from 'react-i18next'
export const userDetail = (t?: TFunction<'common'>) => {
  const userDetail = {
    name: 'Joseph Howard',
    post: 'Managing Director',
  }
  const fields = [
    {
      id: '1',
      label: t('team.user.personal.details.first.name.label'),
      name: 'firstname',
      control: 'input',
      type: 'text',
    },
    {
      id: '2',
      label: t('team.user.personal.details.Last.name.label'),
      name: 'lastname',
      control: 'input',
      type: 'text',
    },
    {
      id: '3',
      label: t('team.user.personal.details.staff.title.label'),
      name: 'staffTitle',
      control: 'select',
      options: ['Title 1', 'Title 2', 'Title 3'],
      placeholder: 'Add staff title',
    },
    {
      id: '4',
      label: t('team.user.personal.details.birthday.label'),
      name: 'birthday',
      control: 'date',
      placeholder: 'DD/MM/YY',
    },
    {
      id: '5',
      label: t('team.user.personal.details.mobile.label'),
      name: 'mobilePhone',
      control: 'phoneInput',
    },
    {
      id: '6',
      label: t('team.user.personal.details.email.label'),
      name: 'email',
      control: 'input',
      type: 'text',
    },
    {
      id: '7',
      label: t('team.user.personal.details.notes.label'),
      name: 'notes',
      control: 'input',
      type: 'textArea',
    },
    {
      id: '8',
      label: t('team.user.personal.details.employee.start.date.label'),
      name: 'employmentStartDate',
      control: 'date',
      type: 'text',
    },
    {
      id: '9',
      label: t('team.user.personal.details.primary.location.label'),
      name: 'primaryLocation',
      control: 'select',
      options: [],
      helpTooltip: 'Help Tooltip',
    },
    {
      id: '10',
      label: t('team.user.personal.details.other.location.label'),
      name: 'otherLocations',
      control: 'checkbox-group',
      options: [
        'M-A Hair dressing & SPA/Illusions beauty salon',
        'Illusions beauty salon',
        'M-A Hair dressing & SPA',
        'Illusions beauty salon & salon',
        'M-A Hair dressing & SPA/M-A Hair dressing & SPA',
      ],
      helpTooltip: 'Help Tooltip',
    },
  ]
  const graphData = {
    daysLeft: 'Jun 24-30 (4 days left)',
    seriesData: [
      [5, 3, 4, 7, 2, 6, 7],
      [2, 5, 3, 2, 1, 2, 3],
    ],
    time: '12h 58m',
    holidayRemaining: 3,
  }
  const PermissionFields = [
    {
      name: 'Contacts',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      key: 1,
      container: [
        {
          name: 'Contact Manager',
          value: true,
          key: 1,
          tooltipMessage: 'Lorem ipsum',
        },
        {
          name: 'Case Manager',
          value: true,
          key: 2,
          tooltipMessage: 'Lorem ipsum',
        },
        {
          name: 'Lab Requests',
          value: true,
          key: 3,
          tooltipMessage: 'Lorem ipsum',
        },
        {
          name: 'Letter Queue',
          value: true,
          key: 4,
          tooltipMessage: 'Lorem ipsum',
        },
      ],
    },
    {
      name: 'Finance',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      key: 2,
      container: [
        {
          name: 'Accounts',
          value: true,
          key: 1,
          tooltipMessage: 'Lorem ipsum',
        },
        {
          name: 'Cashup',
          value: true,
          key: 2,
          tooltipMessage: 'Lorem ipsum',
        },
        {
          name: 'Expenses',
          value: true,
          key: 3,
          tooltipMessage: 'Lorem ipsum',
        },
      ],
    },
    {
      name: 'Leads',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      key: 3,
      container: [
        {
          name: 'Lead Manager',
          value: true,
          key: 1,
          tooltipMessage: 'Lorem ipsum',
        },
      ],
    },
    {
      name: 'Marketing',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      key: 4,
      container: [
        {
          name: 'SMS Campaigns',
          value: true,
          key: 1,
          tooltipMessage: 'Lorem ipsum',
        },
        {
          name: 'Newsletters',
          value: true,
          key: 2,
          tooltipMessage: 'Lorem ipsum',
        },
        {
          name: 'Feedback Surveys',
          value: true,
          key: 3,
          tooltipMessage: 'Lorem ipsum',
        },
        {
          name: 'Birthday Mailer',
          value: true,
          key: 4,
          tooltipMessage: 'Lorem ipsum',
        },
        {
          name: 'Gift Vouchers',
          value: true,
          key: 5,
          tooltipMessage: 'Lorem ipsum',
        },
        {
          name: 'Referral Tracker',
          value: true,
          key: 6,
          tooltipMessage: 'Lorem ipsum',
        },
        {
          name: 'Loyalty',
          value: true,
          key: 7,
          tooltipMessage: 'Lorem ipsum',
        },
      ],
    },
    {
      name: 'Reports',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      key: 5,
      container: [
        {
          name: 'Reports',
          value: true,
          key: 1,
          tooltipMessage: 'Lorem ipsum',
        },
      ],
    },
    {
      name: 'Stock',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      key: 6,
      container: [
        {
          name: 'Products',
          value: true,
          key: 1,
          tooltipMessage: 'Lorem ipsum',
        },
        {
          name: 'Inventory Count',
          value: true,
          key: 2,
          tooltipMessage: 'Lorem ipsum',
        },
        {
          name: 'Purchase Order',
          value: true,
          key: 3,
          tooltipMessage: 'Lorem ipsum',
        },
        {
          name: 'Supplier',
          value: true,
          key: 4,
          tooltipMessage: 'Lorem ipsum',
        },
      ],
    },
    {
      name: 'Calendar',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      key: 7,
      container: [
        {
          name: 'Calendar',
          value: true,
          key: 1,
          tooltipMessage: 'Lorem ipsum',
        },
      ],
    },
    {
      name: 'Staff',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      key: 8,
      container: [
        {
          name: 'Staff Manager',
          value: true,
          key: 1,
          tooltipMessage: 'Lorem ipsum',
        },
        {
          name: 'Staff Targets',
          value: true,
          key: 2,
          tooltipMessage: 'Lorem ipsum',
        },
        {
          name: 'Staff Rota',
          value: true,
          key: 3,
          tooltipMessage: 'Lorem ipsum',
        },
      ],
    },
  ]
  const feature = [
    {
      id: '1',
      title: 'Features',
      subtitle: 'Choose what things Joseph Howard can do',
      permissionFields: [
        {
          name: 'Calendar',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          key: 1,
          container: [
            {
              name: 'Available on calendar',
              value: true,
              key: 1,
              tooltipMessage: 'Lorem ipsum',
            },
            {
              name: 'View everybody???s calendar',
              value: true,
              key: 2,
              tooltipMessage: 'Lorem ipsum',
            },
            {
              name: 'Can make Bookout slot',
              value: true,
              key: 3,
              tooltipMessage: 'Lorem ipsum',
            },
            {
              name: 'Bookable online',
              value: true,
              key: 4,
              tooltipMessage: 'Lorem ipsum',
            },
          ],
        },
        {
          name: 'Financials',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          key: 2,
          container: [
            {
              name: 'Can void sales',
              value: true,
              key: 1,
              tooltipMessage: 'Lorem ipsum',
            },
            {
              name: 'Can Edit Invoice Content',
              value: true,
              key: 2,
              tooltipMessage: 'Lorem ipsum',
            },
            {
              name: 'Available to Sell',
              value: true,
              key: 3,
              tooltipMessage: 'Lorem ipsum',
            },
          ],
        },
        {
          name: 'Other',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          key: 3,
          container: [
            {
              name: 'Can delete alert notes',
              value: true,
              key: 1,
              tooltipMessage: 'Lorem ipsum',
            },
            {
              name: 'Edit/Delete EMR',
              value: true,
              key: 2,
              tooltipMessage: 'Lorem ipsum',
            },
            {
              name: 'Merge duplicate Contrast/Leads',
              value: false,
              key: 3,
              tooltipMessage: 'Lorem ipsum',
            },
            {
              name: 'Appear on reports',
              value: false,
              key: 4,
              tooltipMessage: 'Lorem ipsum',
            },
            {
              name: 'Can manage rota',
              value: false,
              key: 5,
              tooltipMessage: 'Lorem ipsum',
            },
          ],
        },
      ],
    },
    {
      id: '2',
      title: 'Patient',
      subtitle: 'Choose what things Joseph Howard can do',
      permissionFields: [
        {
          name: 'Lorem ipsum',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          key: 1,
          container: [
            {
              name: 'Person Details',
              value: false,
              key: 1,
              tooltipMessage: 'Lorem ipsum',
            },
            {
              name: 'Photos',
              value: true,
              key: 2,
              tooltipMessage: 'Lorem ipsum',
            },
            {
              name: 'Documents',
              value: true,
              key: 3,
              tooltipMessage: 'Lorem ipsum',
            },
            {
              name: 'Consents',
              value: true,
              key: 4,
              tooltipMessage: 'Lorem ipsum',
            },
          ],
        },
        {
          name: 'Lorem ipsum',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          key: 2,
          container: [
            {
              name: 'Appointments',
              value: true,
              key: 1,
              tooltipMessage: 'Lorem ipsum',
            },
            {
              name: 'Financials',
              value: true,
              key: 2,
              tooltipMessage: 'Lorem ipsum',
            },
            {
              name: 'Packages',
              value: true,
              key: 3,
              tooltipMessage: 'Lorem ipsum',
            },
          ],
        },
        {
          name: 'Lorem ipsum',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          key: 3,
          container: [
            {
              name: 'Communications',
              value: true,
              key: 1,
              tooltipMessage: 'Lorem ipsum',
            },
            {
              name: 'Treatments',
              value: true,
              key: 2,
              tooltipMessage: 'Lorem ipsum',
            },
            {
              name: 'Prescriptions',
              value: false,
              key: 3,
              tooltipMessage: 'Lorem ipsum',
            },
            {
              name: 'Loyalty',
              value: false,
              key: 4,
              tooltipMessage: 'Lorem ipsum',
            },
            {
              name: 'Lab Requests',
              value: false,
              key: 5,
              tooltipMessage: 'Lorem ipsum',
            },
          ],
        },
      ],
    },
  ]
  const reportsPermission = [
    {
      key: '1',
      name: 'Contact Reports',
      children: [
        {
          key: 'CO001',
          name: 'CO001 - Basic Information',
        },
        {
          key: 'CO003',
          name: 'CO003 - Birthday',
        },
        {
          key: 'CO010',
          name: 'CO010 - Outstanding Packages',
        },
        {
          key: 'CO020',
          name: 'CO020 - New Clients',
        },
        {
          key: 'CO030',
          name: 'CO030 - Last Spend',
        },
        {
          key: 'CO031',
          name: 'CO031 - Last Visit',
        },
        {
          key: 'CO035',
          name: 'CO035 - Clients by Location',
        },
        {
          key: 'CO046',
          name: 'CO046 - First Visit',
        },
        {
          key: 'VA001',
          name: 'VA001 - Vaccination Report',
        },
        {
          key: 'CO045',
          name: 'CO045 - Big Spender by Receipt',
        },
        {
          key: 'CO050',
          name: 'CO050 - Client Receipts by Category',
        },
        {
          key: 'CO065',
          name: 'CO065 - Client Retail Purchases',
        },
        {
          key: 'CO070',
          name: 'CO070 - Account Balance',
        },
        {
          key: 'CO075',
          name: 'CO075 - Client Service Sales',
        },
        {
          key: 'CO147',
          name: 'CO147 - Medical Data Report',
        },
        {
          key: 'CO060',
          name: 'CO060 - Duplicate Clients',
        },
        {
          key: 'CO105',
          name: 'CO105 - Patient Prescriptions',
        },
        {
          key: 'CO110',
          name: 'CO110 - Clients Treatment Interest',
        },
        {
          key: 'CO111',
          name: 'CO111 - Never Purchased Before',
        },
        {
          key: 'CO115',
          name: 'CO115 - Client Enquiry Conversion',
        },
        {
          key: 'CO130',
          name: 'CO130 - Product Consumption',
        },
        {
          key: 'CO135',
          name: 'CO135 - Account Activity',
        },
        {
          key: 'CO140',
          name: 'CO140 - Last Customer Bookings by Employee',
        },
        {
          key: 'CO145',
          name: 'CO145 - Account Balance by Date',
        },
        {
          key: 'CO146',
          name: 'CO146 - Treatment Missing Data',
        },
      ],
    },
    {
      key: '2',
      name: 'Marketing Reports',
      children: [
        {
          key: 'CO095',
          name: 'CO095 - Client Recalls',
        },
        {
          key: 'CO100',
          name: 'CO100 - Loyalty Report',
        },
        {
          key: 'CO085',
          name: 'CO085 - Gift Cards',
        },
        {
          key: 'CO090',
          name: 'CO090 - Gift Card Analysis',
        },
        {
          key: 'MA001',
          name: 'MA001 - Sales by Referral Source',
        },
        {
          key: 'MA005',
          name: 'MA005 - Opt In Text Contacts',
        },
        {
          key: 'MA010',
          name: 'MA010 - Opt In Email Contacts',
        },
        {
          key: 'MA020',
          name: 'MA020 - Referral Sources',
        },
        {
          key: 'MA025',
          name: 'MA025 - Feedback Results',
        },
        {
          key: 'MA030',
          name: 'MA030 - Survey Feedback',
        },
      ],
    },
    {
      key: '3',
      name: 'Finance Reports',
      children: [
        {
          key: 'FI000',
          name: 'FI000 - Daily Sales',
        },
        {
          key: 'FI001',
          name: 'FI001 - Daily Reconciliation',
        },
        {
          key: 'FI002',
          name: 'FI002 - Daily Payments',
        },
        {
          key: 'FI005',
          name: 'FI005 - Receipts by Employee - Detailed',
        },
        {
          key: 'FI006',
          name: 'FI006 - Sales by Employee Detailed Cross',
        },
        {
          key: 'FI010',
          name: 'FI010 - Receipts by Retail Category',
        },
        {
          key: 'FI011',
          name: 'FI011 - Receipts by Service Category',
        },
        {
          key: 'FI012',
          name: 'FI012 - Receipts by Category',
        },
        {
          key: 'FI014',
          name: 'FI014 - Sales by Category',
        },
        {
          key: 'FI015',
          name: 'FI015 - Receipts by Employee (Service)',
        },
        {
          key: 'FI016',
          name: 'FI016 - Receipts by Employee (Retail)',
        },
        {
          key: 'FI019',
          name: 'FI019 - VAT Report',
        },
        {
          key: 'FI025',
          name: 'FI025 - Receipts by Month',
        },
        {
          key: 'FI026',
          name: 'FI026 - Monthly Taking (Summary)',
        },
        {
          key: 'FI030',
          name: 'FI030 - Raised Invoices',
        },
        {
          key: 'FI040',
          name: 'FI040 - Expenses',
        },
        {
          key: 'FI075',
          name: 'FI075 - Outstanding Invoices',
        },
        {
          key: 'FI085',
          name: 'FI085 - Service vs Retail Receipts',
        },
        {
          key: 'FI090',
          name: 'FI090 - Aged Insurance Debt Report',
        },
        {
          key: 'FI017',
          name: 'FI017 - Receipts by Employee Detailed (VAT)',
        },
        {
          key: 'FI022',
          name: 'FI022 - Daily Performance Stats',
        },
        {
          key: 'FI031',
          name: 'FI031 - Invoice Activity',
        },
        {
          key: 'FI035',
          name: 'FI035 - Receipts by Payment Method',
        },
        {
          key: 'FI055',
          name: 'FI055 - Unpaid Visits',
        },
        {
          key: 'FI060',
          name: 'FI060 - Free Giveaways',
        },
        {
          key: 'FI065',
          name: 'FI065 - Appointment Income Projection',
        },
        {
          key: 'FI070',
          name: 'FI070 - Discount Report',
        },
        {
          key: 'FI080',
          name: 'FI080 - Sales vs Expense',
        },
        {
          key: 'FI155',
          name: 'FI155 - Insurance Report',
        },
        {
          key: 'OT001',
          name: 'OT001 - Sales Conversion',
        },
        {
          key: 'OT002',
          name: 'OT002 - Telesales Report',
        },
      ],
    },
    {
      key: '4',
      name: 'Lead Reports',
      children: [
        {
          key: 'LE000',
          name: 'LE000 - Open Leads',
        },
        {
          key: 'LE001',
          name: 'LE001 - Converted Leads',
        },
        {
          key: 'LE005',
          name: 'LE005 - Leads',
        },
        {
          key: 'LE015',
          name: 'LE015 - Leads by Status',
        },
        {
          key: 'LE020',
          name: 'LE020 - Leads by Sources',
        },
        {
          key: 'LE035',
          name: 'LE035 - Leads by Interest',
        },
        {
          key: 'LE040',
          name: 'LE040 - Leads by Clinic',
        },
      ],
    },
    {
      key: '5',
      name: 'Appointments',
      children: [
        {
          key: 'CO021',
          name: 'CO021 - Booked Appointments',
        },
        {
          key: 'CO025',
          name: 'CO025 - Missed/Cancelled Appointments',
        },
        {
          key: 'CO036',
          name: 'CO036 - Connect Registration & Bookings',
        },
        {
          key: 'CO040',
          name: 'CO040 - Consultation Conversion',
        },
        {
          key: 'CO006',
          name: 'CO006 - Appointments by Service Type Count',
        },
        {
          key: 'CO125',
          name: 'CO125 - Surgery Preparations',
        },
        {
          key: 'CO140',
          name: 'CO140 - Last Customer Bookings by Employee',
        },
        {
          key: 'ST000',
          name: 'ST000 - Staff Appointment Schedule',
        },
        {
          key: 'ST025',
          name: 'ST025 - Employee Appointment Summary',
        },
        {
          key: 'BETA',
          name: 'BETA - Locations Report',
        },
        {
          key: 'OT003',
          name: 'OT003 - Classes and Appointments report',
        },
        {
          key: 'OT014',
          name: 'OT014 - Room Utilization',
        },
        {
          key: 'OT009',
          name: 'OT009 - Clinic Conversion',
        },
      ],
    },
    {
      key: '6',
      name: 'Stock Reports',
      children: [
        {
          key: 'STK001',
          name: 'STK001 - Stock Report',
        },
        {
          key: 'STK005',
          name: 'STK005 - Low Stock',
        },
        {
          key: 'STK015',
          name: 'STK015 - Cost of Goods',
        },
        {
          key: 'STK025',
          name: 'STK025 - Stock Count',
        },
      ],
    },
    {
      key: '7',
      name: 'Staff Reports',
      children: [
        {
          key: 'Team',
          name: 'Team Report',
        },
        {
          key: 'BETA',
          name: 'BETA - Staff Bookouts',
        },
        {
          key: 'ST001',
          name: 'ST001 - Staff Performance Summary',
        },
        {
          key: 'ST002',
          name: 'ST002 - Commission Summary',
        },
        {
          key: 'ST003',
          name: 'ST003 - Commission Report (Retail)',
        },
        {
          key: 'ST004',
          name: 'ST004 - Staff Performance Tracker',
        },
        {
          key: 'ST005',
          name: 'ST005 - Employee Holidays To Date',
        },
        {
          key: 'ST015',
          name: 'ST015 - Staff Hours',
        },
        {
          key: 'ST025',
          name: 'ST025 - Employee Appointment Summary',
        },
        {
          key: 'ST031',
          name: 'ST031 - Daily Employee Stats (Summary)',
        },
        {
          key: 'ST033',
          name: 'ST033 - Daily Employee Stats',
        },
        {
          key: 'ST035',
          name: 'ST035 - Staff Days Off',
        },
        {
          key: 'ST036',
          name: 'ST036 - Staff Payroll Report',
        },
        {
          key: 'ST037',
          name: 'ST037 - Staff Clock In/Out',
        },
      ],
    },
  ]
  const reportPermissionsKeys = ['CO001', 'CO003', 'CO110']
  const userDetailDocuments = {
    name: 'Charlotte Abbott',
    position: 'Sr. HR Administrator',
  }
  const documentsFolder = [
    {
      name: 'Signed Documents',
      files: [
        {
          key: '1',
          name: 'Company Handbook.pdf',
          status: 'Shared',
          addedByDate: 'Added 07/09/2020 by Charlotte Abbott',
          size: '25.5 MB',
        },
      ],
    },
    {
      name: 'Resumes and Applications',
      files: [
        {
          key: '2',
          name: 'Company Handbook.pdf',
          status: 'Shared',
          addedByDate: 'Added 07/09/2020 by Charlotte Abbott',
          size: '25.5 MB',
        },
        {
          key: '3',
          name: '1-9 (2017).pdf',
          status: 'Shared',
          addedByDate: 'Added 07/09/2020 by Charlotte Abbott',
          size: '25.5 MB',
        },
      ],
    },
    {
      name: 'Workflow Attachments',
      files: [
        {
          key: '4',
          name: 'Company Handbook.pdf',
          status: 'Shared',
          addedByDate: 'Added 07/09/2020 by Charlotte Abbott',
          size: '25.5 MB',
        },
        {
          key: '5',
          name: '1-9 (2017).pdf',
          status: 'Shared',
          addedByDate: 'Added 07/09/2020 by Charlotte Abbott',
          size: '25.5 MB',
        },
      ],
    },
    {
      name: 'Tasklist Attachments',
      files: [
        {
          key: '6',
          name: 'Company Handbook.pdf',
          status: 'Shared',
          addedByDate: 'Added 07/09/2020 by Charlotte Abbott',
          size: '25.5 MB',
        },
        {
          key: '7',
          name: '1-9 (2017).pdf',
          status: 'Shared',
          addedByDate: 'Added 07/09/2020 by Charlotte Abbott',
          size: '25.5 MB',
        },
      ],
    },
  ]
  const serviceData = [
    {
      title: 'Select all',
      key: 'all',
      children: [
        {
          title: 'Accent prime',
          key: 'Accent prime',
          children: [
            {
              title: 'Subcategory 1',
              key: 'Accent prime - Subcategory 1',
            },
            {
              title: 'Subcategory 2',
              key: 'Accent prime - Subcategory 2',
            },
            {
              title: 'Subcategory 3',
              key: 'Accent prime - Subcategory 3',
            },
          ],
        },
        {
          title: 'All-inclusive',
          key: 'All-inclusive',
          children: [
            {
              title: 'Subcategory 1',
              key: 'All-inclusive - Subcategory 1',
            },
            {
              title: 'Subcategory 2',
              key: 'All-inclusive - Subcategory 2',
            },
            {
              title: 'Subcategory 3',
              key: 'All-inclusive - Subcategory 3',
            },
          ],
        },
        {
          title: 'Botox',
          key: 'Botox',
        },
      ],
    },
  ]
  const performancePeerFeedback = {
    users: [
      {
        id: 1,
        name: 'Dominic Nguyen',
        title: '',
        avatarUrl: 'https://avatars2.githubusercontent.com/u/132554',
      },
      {
        id: 2,
        name: 'Tom Coleman',
        title: '',
        avatarUrl: 'https://avatars2.githubusercontent.com/u/132554',
      },
      {
        id: 3,
        name: 'Zoltan Olah',
        title: '',
        avatarUrl: 'https://avatars0.githubusercontent.com/u/81672',
      },
      {
        id: 4,
        name: 'Tim Hingston',
        title: '',
        avatarUrl: 'https://avatars3.githubusercontent.com/u/1831709',
      },
    ],
    lastSendOut: 'Last sent out',
    reviewDate: new Date('2017-04-14T00:00:00'),
    reviewFilled: 'Reviews Filled',
    filled: 'Filled',
    reviewData: {
      title1: 'Filled',
      title2: 'Pending',
      value: 21,
      total: 80,
    },
    employees: [
      {
        id: 1,
        info: {
          id: 1,
          name: 'Dominic Nguyen',
          title: 'Human Resources Advisor',
          avatarUrl: 'https://avatars2.githubusercontent.com/u/132554',
        },
        analyticalThinking: 3,
        attentionToDetail: 3,
        myCustomCategory: 3,
      },
      {
        id: 2,
        info: {
          id: 2,
          name: 'Dominic Nguyen',
          title: 'Human Resources Advisor',
          avatarUrl: 'https://avatars2.githubusercontent.com/u/132554',
        },
        analyticalThinking: 3,
        attentionToDetail: 3,
        myCustomCategory: 3,
      },
      {
        id: 3,
        info: {
          id: 3,
          name: 'Dominic Nguyen',
          title: 'Human Resources Advisor',
          avatarUrl: 'https://avatars2.githubusercontent.com/u/132554',
        },
        analyticalThinking: 3,
        attentionToDetail: 3,
        myCustomCategory: 3,
      },
      {
        id: 4,
        info: {
          id: 4,
          name: 'Dominic Nguyen',
          title: 'Human Resources Advisor',
          avatarUrl: 'https://avatars2.githubusercontent.com/u/132554',
        },
        analyticalThinking: 3,
        attentionToDetail: 3,
        myCustomCategory: 3,
      },
    ],
    reports: [
      {
        id: 1,
        info: {
          id: 1,
          name: 'Dominic Nguyen',
          title: 'Human Resources Advisor',
          avatarUrl: 'https://avatars2.githubusercontent.com/u/132554',
        },
        requestedOn: '13/07/2018 10:31:35',
        completedOn: '13/07/2018 10:31:35',
        action: false,
      },
      {
        id: 2,
        info: {
          id: 2,
          name: 'Dominic Nguyen',
          title: 'Human Resources Advisor',
          avatarUrl: 'https://avatars2.githubusercontent.com/u/132554',
        },
        requestedOn: '13/07/2018 10:31:35',
        completedOn: '13/07/2018 10:31:35',
        action: true,
      },
      {
        id: 3,
        info: {
          id: 3,
          name: 'Dominic Nguyen',
          title: 'Human Resources Advisor',
          avatarUrl: 'https://avatars2.githubusercontent.com/u/132554',
        },
        requestedOn: '13/07/2018 10:31:35',
        completedOn: '13/07/2018 10:31:35',
        action: false,
      },
      {
        id: 4,
        info: {
          id: 4,
          name: 'Dominic Nguyen',
          title: 'Human Resources Advisor',
          avatarUrl: 'https://avatars2.githubusercontent.com/u/132554',
        },
        requestedOn: '13/07/2018 10:31:35',
        completedOn: '13/07/2018 10:31:35',
        action: false,
      },
      {
        id: 5,
        info: {
          id: 5,
          name: 'Dominic Nguyen',
          title: 'Human Resources Advisor',
          avatarUrl: 'https://avatars2.githubusercontent.com/u/132554',
        },
        requestedOn: '13/07/2018 10:31:35',
        completedOn: '13/07/2018 10:31:35',
        action: true,
      },
    ],
    remindEmployees: [
      { name: 'Jessica Winter', selected: false },
      { name: 'Linda Davis', selected: false },
      { name: 'William Tyson', selected: false },
      { name: 'Kyle Walsh', selected: false },
      { name: 'Owen Phillips', selected: false },
      { name: 'Aidan Kelly', selected: false },
      { name: 'Ewan Morgan', selected: false },
      { name: 'Jordan Martin', selected: false },
      { name: 'Grant Dudley', selected: false },
    ],
  }
  const performanceAssessmentData = {
    assessmentPeriod: {
      dropDownItems: [
        'Jul 19, 2020 - Jan 6, 2021',
        'Jul 19, 2019 - Jan 6, 2020',
        'Jul 19, 2021 - Jan 6, 2022',
      ],
    },
    isSelfAssessment: true,
    selfAssessment: {
      completed: 'Aug 24, 2020 at 8:04 PM by Jennifer Caldwell',
      questionAnswer: [
        {
          key: '1',
          label: 'How well does Bills company recognize my value?',
          value: 'I feel I am highly valued.',
        },
        {
          key: '2',
          label:
            'What would have the greatest impact on my ability to do my best work more often?',
          value: 'Coworkers were more committed to doing great work.',
        },
      ],
      moreQuestionAnswer: [
        {
          key: '3',
          label: 'What are some things I do well?',
          value:
            'We???re doing a great job measuring the success of our team activities. This has come a long way and the team is fully behind our new measurement processes.',
        },
        {
          key: '4',
          label: 'How could I improve?',
          value:
            'I need to spend more time with my immediate team. With our ongoing strategy meetings and business planning I???ve been less accessible to my team and I???m sensing some frustration from my team, especially on recruiting decisions.',
        },
      ],
    },
    isManagerAssessment: true,
    managerAssessment: {
      completed: 'Aug 24, 2020 at 8:04 PM by Jennifer Caldwell',
      selectOptions: [
        {
          key: '1',
          label: 'If Jennifer got a job offer elsewhere, I would',
          options: [
            'Convince Jennifer to stay. Jennifer would be difficult to replace.',
            'Convince Jennifer to stay',
          ],
          value:
            'Convince Jennifer to stay. Jennifer would be difficult to replace.',
          count: 4,
        },
        {
          key: '2',
          label: 'How engaged is Jennifer at work?',
          options: [
            'Good engagement and a mostly positive attitude.',
            'Good engagement.',
          ],
          value: 'Good engagement and a mostly positive attitude.',
          count: 4,
        },
      ],
      questionAnswer: [
        {
          key: '3',
          label: 'What are some things Jennifer does well?',
          value:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in libero ullamcorper, congue sapien id.Lorem ipsum dolor sit.',
        },
        {
          key: '4',
          label: 'How could Jennifer improve?',
          value:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in libero ullamcorper, congue sapien id.',
        },
      ],
    },
  }

  const emergencyData = {
    primaryDetail: {
      primaryContactName: 'Joseph',
      relationship: 'Howard',
      address: 'London Road, Sheffield, England',
      secondaryAddress: 'London Road, Sheffield, England',
      city: 'London',
      postcode: '29817',
      mobilePhone: '(+656) 254-2568',
      homePhone: '(+656) 254-2568',
      workPhone: '(+656) 254-2568',
    },
    doctorDetail: {
      doctorName: 'Michelle Howard',
      phone: '(+656) 254-2568',
      notes:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in libero ullamcorper.',
    },
    secondaryDetail: {
      secondaryContactName: 'Joseph',
      relationship: 'Howard',
      address: 'London Road, Sheffield, England',
      secondaryAddress: 'London Road, Sheffield, England',
      city: 'London',
      postcode: '29817',
      mobilePhone: '(+656) 254-2568',
      homePhone: '(+656) 254-2568',
      workPhone: '(+656) 254-2568',
    },
  }
  return {
    userDetail,
    fields,
    graphData,
    PermissionFields,
    feature,
    reportsPermission,
    reportPermissionsKeys,
    userDetailDocuments,
    documentsFolder,
    serviceData,
    performancePeerFeedback,
    performanceAssessmentData,
    emergencyData,
  }
}
