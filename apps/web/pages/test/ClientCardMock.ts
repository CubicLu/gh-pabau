import userAvatar from './assets/austin.png'
import EmployeeImg from './assets/employees/1.png'

export const searchResults = [
  { id: '1', firstName: 'Will', lastName: 'Lawsons', avatarUrl: userAvatar },
  { id: '2', firstName: 'Jessica', lastName: 'Winter', avatarUrl: userAvatar },
  { id: '3', firstName: 'Stephen', lastName: 'Watson', avatarUrl: userAvatar },
  { id: '4', firstName: 'Walt', lastName: 'Smith', avatarUrl: userAvatar },
  { id: '5', firstName: 'Willy', lastName: 'Brown', avatarUrl: userAvatar },
]

export const notes = {
  client: [
    {
      avatar: userAvatar,
      content:
        "Call: Dear team, I hope you are having a great day. I'm doing some tests around patient emails and Pabau and how our Doctors could respond to emails. Please leave this in the doctor@LSAH.co.uk inbox for me. No action required. Regards, Bruno",
      client: 'Bruno Ballardin',
      date: '2020-08-09 11:17 AM',
    },
    {
      avatar: userAvatar,
      content:
        'Call: Inbox > Message Detail Print Next Subject: Query for Dr Martin Wade (test) From: Bruno Ballardin (Add as Preferred Sender) Date: Wed, Aug 19, 2020 10:48 am To: "doctor@LSAH.co.uk" Dear team, I hope you are having a great day. I\'m doing some tests around patient emails and Pabau and how our Doctors could respond to emails. Please leave this in the doctor@LSAH.co.uk inbox for me. No action required. Regards, Bruno',
      client: 'Bruno Ballardin',
      date: '2020-08-09 11:17 AM',
    },
  ],
  appointment: [
    {
      avatar: userAvatar,
      content:
        "Call: Dear team, I hope you are having a great day. I'm doing some tests around patient emails and Pabau and how our Doctors could respond to emails. Please leave this in the doctor@LSAH.co.uk inbox for me. No action required. Regards, Bruno",
      client: 'Bruno Ballardin',
      date: '2020-08-09 11:17 AM',
    },
    {
      avatar: userAvatar,
      content:
        'Call: Inbox > Message Detail Print Next Subject: Query for Dr Martin Wade (test) From: Bruno Ballardin (Add as Preferred Sender) Date: Wed, Aug 19, 2020 10:48 am To: "doctor@LSAH.co.uk" Dear team, I hope you are having a great day. I\'m doing some tests around patient emails and Pabau and how our Doctors could respond to emails. Please leave this in the doctor@LSAH.co.uk inbox for me. No action required. Regards, Bruno',
      client: 'Bruno Ballardin',
      date: '2020-08-09 11:17 AM',
    },
  ],
}

export const clientData = {
  fullName: 'Bruno Ballardin',
  firstName: 'Bruno',
  lastName: 'Ballardin',
  avatar: userAvatar,
  isActive: true,
  cardOption: '',
  labels: [
    { label: '#coporate', color: '#1a89d0', count: 0 },
    { label: '#new-patient', color: '#1bba2a', count: 0 },
    { label: 'new client', color: '#467a34', count: 0 },
    { label: '2 no shows', color: '#6892bf', count: 0 },
  ],
  onAccount: -540,
  outStanding: 540,
  patientID: '325',
  referredBy: 'Doctor Referral',
  dob: '1969-06-16',
  gender: 'Male',
  address: '68 Vassall Road, London, SW9 6HY',
  phone: '383299103',
  email: 'bruno.ballardin@outlook.com',
  regDate: '2021-01-01',
  relationships: [
    {
      type: 'company',
      company: 'Deddington Health Centre',
      address: 'Earls Lane , Deddington, Banbury, Oxfordshire OX15 0TQ',
      phone: '+44 (0) 1869338611',
    },
  ],
  defaultPayer: 'Self paid',
  discount: '',
  pricelist: '',
  membershipNumber: 'BL-4444-0000-2222',
  allocatedAuthorisations: '',
}
export const financialInvoices = {
  totalOutstanding: 500,
  totalInvoiced: 2500,
  accountCredit: 1995,
  totalPayments: 1995.97,
  totalSales: 2120,
  totalBalance: 1995.97,
  invoices: [
    {
      id: '923345',
      type: 'package',
      date: '10/12/2020',
      location: 'The London Skin and Hair Clinic',
      employee: 'Anika Kadir',
      issuedTo: 'Bruno Ballardin',
      paid: false,
      status: 'outstanding_invoices',
      items: [
        {
          employee: 'Anika Kadir',
          id: 1,
          name: 'Dispensary - prescription medications',
          price: 28,
          quantity: 1,
          discount: 20,
          tax: 0,
          totalPrice: 28,
        },
        {
          employee: 'Anika Kadir',
          id: 2,
          name: 'Viviscal Professional - one pack (60 tablets)',
          price: 28,
          quantity: 2,
          discount: 30,
          tax: 0,
          totalPrice: 56,
        },
      ],
      totalVat: 0,
      amountPaid: 0,
      subtotal: 600,
      tips: 0,
      grandTotal: 600,
      paymentStatus: 0,
      paymentStatusTooltip:
        'Full payment received on Sunday, 16 May 2021 at CHISSY BEAUTY STUDIO by Chissy Stylist',
      tip: {
        amount: '10',
        type: '%',
        staff: 'John Doe',
      },
      history: [
        {
          title: 'Issued to: Vedran Taneski',
          date: 'Last Friday at 3:00 PM',
          notif_by: 'Ben Gough',
          type: 'issue',
        },
        {
          title: 'Invoice issue',
          date: '12 Mar at 3:00 PM',
          description:
            'Dear John, I have gone ahead and looked to book an appointment in with Dr Smith Brandham for next Thursday if that time works ok with you?',
          notif_by: 'Martin Wade',
          views: 2,
          type: 'email',
        },
        {
          title: 'Refund #38128',
          date: '12 Mar at 3:00 PM',
          notif_by: 'Martin Wade',
          amount: 32,
          type: 'refund',
        },
        {
          title: 'Payment deleted #38128',
          date: '12 Mar at 3:00 PM',
          notif_by: 'Martin Wade',
          amount: 41,
          type: 'delete',
        },
        {
          title: 'Payment added #38128',
          date: '12 Mar at 3:00 PM',
          notif_by: 'Martin Wade',
          amount: 41,
          type: 'add',
        },
      ],
      payments: [
        {
          id: 1,
          employee: 'Anika Kadir',
          method: 'Electronic Transfer',
          amount: 28,
          date: '18/12/2020',
          note: '',
          showNote: false,
          noteSaved: false,
        },
        {
          id: 2,
          employee: 'John Doe',
          method: 'Electronic Transfer',
          amount: 400,
          date: '02/12/2020',
          note: 'edited prices',
          showNote: true,
          noteSaved: true,
        },
      ],
    },
    {
      id: '923346',
      date: '10/12/2020',
      location: 'The London Skin and Hair Clinic',
      employee: 'Anika Kadir',
      issuedTo: 'Bruno Ballardin',
      paid: false,
      status: 'outstanding_invoices',
      items: [
        {
          employee: 'Anika Kadir',
          id: 1,
          name: 'Dispensary - prescription medications',
          price: 28,
          quantity: 1,
          discount: 0,
          tax: 0,
          totalPrice: 28,
        },
        {
          employee: 'Anika Kadir',
          id: 2,
          name: 'Viviscal Professional - one pack (60 tablets)',
          price: 28,
          quantity: 2,
          discount: 0,
          tax: 0,
          totalPrice: 56,
        },
      ],
      totalVat: 0,
      amountPaid: 0,
      subtotal: 2250,
      tips: 0,
      grandTotal: 2250,
      paymentStatus: 1,
    },
    {
      id: '9233432',
      date: '10/12/2020',
      location: 'The London Skin and Hair Clinic',
      employee: 'Anika Kadir',
      issuedTo: 'Bruno Ballardin',
      paid: false,
      status: 'outstanding_invoices',
      items: [
        {
          employee: 'Anika Kadir',
          id: 1,
          name: 'Dispensary - prescription medications',
          price: 28,
          quantity: 1,
          discount: 0,
          tax: 0,
          totalPrice: 28,
        },
        {
          employee: 'Anika Kadir',
          id: 2,
          name: 'Viviscal Professional - one pack (60 tablets)',
          price: 28,
          quantity: 2,
          discount: 0,
          tax: 0,
          totalPrice: 56,
        },
      ],
      totalVat: 0,
      amountPaid: 0,
      subtotal: 2250,
      tips: 0,
      grandTotal: 2250,
      paymentStatus: 4,
    },
    {
      id: '9233421',
      date: '10/12/2020',
      location: 'The London Skin and Hair Clinic',
      employee: 'Anika Kadir',
      issuedTo: 'Bruno Ballardin',
      paid: true,
      status: 'paid',
      items: [
        {
          employee: 'Anika Kadir',
          id: 1,
          name: 'Dispensary - prescription medications',
          price: 28,
          quantity: 1,
          discount: 0,
          tax: 0,
          totalPrice: 28,
        },
        {
          employee: 'Anika Kadir',
          id: 2,
          name: 'Viviscal Professional - one pack (60 tablets)',
          price: 28,
          quantity: 2,
          discount: 0,
          tax: 0,
          totalPrice: 56,
        },
      ],
      totalVat: 0,
      amountPaid: 0,
      subtotal: 2250,
      tips: 0,
      grandTotal: 2250,
      paymentStatus: 4,
    },
    {
      id: '923341',
      date: '10/12/2020',
      location: 'The London Skin and Hair Clinic',
      employee: 'Anika Kadir',
      issuedTo: 'Bruno Ballardin',
      paid: false,
      status: 'unsent_invoices',
      items: [
        {
          employee: 'Anika Kadir',
          id: 1,
          name: 'Dispensary - prescription medications',
          price: 28,
          quantity: 1,
          discount: 0,
          tax: 0,
          totalPrice: 28,
        },
        {
          employee: 'Anika Kadir',
          id: 2,
          name: 'Viviscal Professional - one pack (60 tablets)',
          price: 28,
          quantity: 2,
          discount: 0,
          tax: 0,
          totalPrice: 56,
        },
      ],
      totalVat: 0,
      amountPaid: 0,
      subtotal: 2250,
      tips: 0,
      grandTotal: 2250,
      paymentStatus: 3,
    },
    {
      id: '9233444',
      date: '10/12/2020',
      location: 'The London Skin and Hair Clinic',
      employee: 'Anika Kadir',
      issuedTo: 'Bruno Ballardin',
      paid: true,
      status: 'paid',
      items: [
        {
          employee: 'Anika Kadir',
          id: 1,
          name: 'Dispensary - prescription medications',
          price: 28,
          quantity: 1,
          discount: 0,
          tax: 0,
          totalPrice: 28,
        },
        {
          employee: 'Anika Kadir',
          id: 2,
          name: 'Viviscal Professional - one pack (60 tablets)',
          price: 28,
          quantity: 2,
          discount: 0,
          tax: 0,
          totalPrice: 56,
        },
      ],
      totalVat: 0,
      amountPaid: 0,
      subtotal: 2250,
      tips: 0,
      grandTotal: 2250,
      paymentStatus: 1,
    },
    {
      id: '92334411',
      date: '10/12/2020',
      location: 'The London Skin and Hair Clinic',
      employee: 'Anika Kadir',
      issuedTo: 'Bruno Ballardin',
      paid: false,
      status: 'sent_invoices',
      items: [
        {
          employee: 'Anika Kadir',
          id: 1,
          name: 'Dispensary - prescription medications',
          price: 28,
          quantity: 1,
          discount: 0,
          tax: 0,
          totalPrice: 28,
        },
        {
          employee: 'Anika Kadir',
          id: 2,
          name: 'Viviscal Professional - one pack (60 tablets)',
          price: 28,
          quantity: 2,
          discount: 0,
          tax: 0,
          totalPrice: 56,
        },
      ],
      totalVat: 0,
      amountPaid: 0,
      subtotal: 2250,
      tips: 0,
      grandTotal: 2250,
      paymentStatus: 1,
    },
    {
      id: '923344122',
      date: '10/12/2020',
      location: 'The London Skin and Hair Clinic',
      employee: 'Anika Kadir',
      issuedTo: 'Bruno Ballardin',
      paid: false,
      status: 'sent_invoices',
      items: [
        {
          employee: 'Anika Kadir',
          id: 1,
          name: 'Dispensary - prescription medications',
          price: 28,
          quantity: 1,
          discount: 30,
          tax: 0,
          totalPrice: 28,
        },
        {
          employee: 'Anika Kadir',
          id: 2,
          name: 'Viviscal Professional - one pack (60 tablets)',
          price: 28,
          quantity: 2,
          discount: 20,
          tax: 0,
          totalPrice: 56,
        },
      ],
      totalVat: 0,
      amountPaid: 0,
      subtotal: 2250,
      tips: 0,
      grandTotal: 2250,
      paymentStatus: 2,
    },
  ],
}
export const financialPayments = [
  {
    id: 1,
    date: '10/12/2020',
    invoiceNo: 923345,
    paymentNo: 1651481,
    location: 'The London Skin and Hair Clinic',
    employee: 'Anika Kadir',
    paidBy: 'Bruno Ballardin',
    method: 'Stripe',
    amount: 28,
  },
  {
    id: 2,
    date: '10/12/2020',
    invoiceNo: 923345,
    paymentNo: 1651482,
    location: 'The London Skin and Hair Clinic',
    employee: 'Anika Kadir',
    paidBy: 'Bruno Ballardin',
    method: 'Stripe',
    amount: 28,
  },
  {
    id: 3,
    date: '10/12/2020',
    invoiceNo: 923345,
    paymentNo: 1651483,
    location: 'The London Skin and Hair Clinic',
    employee: 'Anika Kadir',
    paidBy: 'Bruno Ballardin',
    method: 'Stripe',
    amount: 28,
  },
  {
    id: 4,
    date: '10/12/2020',
    invoiceNo: 923345,
    paymentNo: 1651484,
    location: 'The London Skin and Hair Clinic',
    employee: 'Anika Kadir',
    paidBy: 'Bruno Ballardin',
    method: 'Stripe',
    amount: 28,
  },
  {
    id: 5,
    date: '10/12/2020',
    invoiceNo: 923345,
    paymentNo: 1651485,
    location: 'The London Skin and Hair Clinic',
    employee: 'Anika Kadir',
    paidBy: 'Bruno Ballardin',
    method: 'Stripe',
    amount: 28,
  },
  {
    id: 6,
    date: '10/12/2020',
    invoiceNo: 923345,
    paymentNo: 1651486,
    location: 'The London Skin and Hair Clinic',
    employee: 'Anika Kadir',
    paidBy: 'Bruno Ballardin',
    method: 'Stripe',
    amount: 28,
  },
  {
    id: 7,
    date: '10/12/2020',
    invoiceNo: 923345,
    paymentNo: 1651487,
    location: 'The London Skin and Hair Clinic',
    employee: 'Anika Kadir',
    paidBy: 'Bruno Ballardin',
    method: 'Stripe',
    amount: 28,
  },
  {
    id: 8,
    date: '10/12/2020',
    invoiceNo: 923345,
    paymentNo: 1651488,
    location: 'The London Skin and Hair Clinic',
    employee: 'Anika Kadir',
    paidBy: 'Bruno Ballardin',
    method: 'Stripe',
    amount: 28,
  },
  {
    id: 9,
    date: '10/12/2020',
    invoiceNo: 923345,
    paymentNo: 1651489,
    location: 'The London Skin and Hair Clinic',
    employee: 'Anika Kadir',
    paidBy: 'Bruno Ballardin',
    method: 'Stripe',
    amount: 28,
  },
  {
    id: 10,
    date: '10/12/2020',
    invoiceNo: 923345,
    paymentNo: 1651410,
    location: 'The London Skin and Hair Clinic',
    employee: 'Anika Kadir',
    paidBy: 'Bruno Ballardin',
    method: 'Stripe',
    amount: 28,
  },
]
export const financialItems = [
  {
    id: 1,
    date: '24/07/2020',
    invoiceNo: 918715,
    name: 'Laser - SHR Hair Removal',
    type: 'Service',
    employee: 'Carina Briggs',
    soldBy: 'Carina Briggs',
    qty: 1,
  },
  {
    id: 2,
    date: '24/07/2020',
    invoiceNo: 918715,
    name: 'Laser - SHR Hair Removal',
    type: 'Service',
    employee: 'Carina Briggs',
    soldBy: 'Carina Briggs',
    qty: 1,
  },
  {
    id: 3,
    date: '24/07/2020',
    invoiceNo: 918715,
    name: 'Laser - SHR Hair Removal',
    type: 'Service',
    employee: 'Carina Briggs',
    soldBy: 'Carina Briggs',
    qty: 1,
  },
  {
    id: 4,
    date: '24/07/2020',
    invoiceNo: 918715,
    name: 'Laser - SHR Hair Removal',
    type: 'Service',
    employee: 'Carina Briggs',
    soldBy: 'Carina Briggs',
    qty: 1,
  },
  {
    id: 5,
    date: '24/07/2020',
    invoiceNo: 918715,
    name: 'Laser - SHR Hair Removal',
    type: 'Service',
    employee: 'Carina Briggs',
    soldBy: 'Carina Briggs',
    qty: 1,
  },
  {
    id: 6,
    date: '24/07/2020',
    invoiceNo: 918715,
    name: 'Laser - SHR Hair Removal',
    type: 'Service',
    employee: 'Carina Briggs',
    soldBy: 'Carina Briggs',
    qty: 1,
  },
  {
    id: 7,
    date: '24/07/2020',
    invoiceNo: 918715,
    name: 'Laser - SHR Hair Removal',
    type: 'Service',
    employee: 'Carina Briggs',
    soldBy: 'Carina Briggs',
    qty: 1,
  },
  {
    id: 8,
    date: '24/07/2020',
    invoiceNo: 918715,
    name: 'Laser - SHR Hair Removal',
    type: 'Service',
    employee: 'Carina Briggs',
    soldBy: 'Carina Briggs',
    qty: 1,
  },
  {
    id: 9,
    date: '24/07/2020',
    invoiceNo: 918715,
    name: 'Laser - SHR Hair Removal',
    type: 'Service',
    employee: 'Carina Briggs',
    soldBy: 'Carina Briggs',
    qty: 1,
  },
  {
    id: 10,
    date: '24/07/2020',
    invoiceNo: 918715,
    name: 'Laser - SHR Hair Removal',
    type: 'Service',
    employee: 'Carina Briggs',
    soldBy: 'Carina Briggs',
    qty: 1,
  },
]
export const financialVoidedPayments = [
  {
    id: 1,
    refNo: 918715,
    items: 'On Account',
    amount: 0,
    voidedBy: 'Carina Briggs',
    date: '24/07/2020',
  },
  {
    id: 2,
    refNo: 918715,
    items: 'On Account',
    amount: 0,
    voidedBy: 'Carina Briggs',
    date: '24/07/2020',
  },
  {
    id: 3,
    refNo: 918715,
    items: 'Repeat prescription (standard)',
    amount: 0,
    voidedBy: 'Carina Briggs',
    date: '24/07/2020',
  },
  {
    id: 4,
    refNo: 918715,
    items: 'Repeat prescription (standard)',
    amount: 0,
    voidedBy: 'Carina Briggs',
    date: '24/07/2020',
  },
  {
    id: 5,
    refNo: 918715,
    items: 'Product (with VAT)',
    amount: 0,
    voidedBy: 'Carina Briggs',
    date: '24/07/2020',
  },
  {
    id: 6,
    refNo: 918715,
    items: 'Viviscal Professional - one pack (60 tablets)',
    amount: 0,
    voidedBy: 'Carina Briggs',
    date: '24/07/2020',
  },
  {
    id: 7,
    refNo: 918715,
    items: 'New Consultation Skin (20300)',
    amount: 0,
    voidedBy: 'Carina Briggs',
    date: '24/07/2020',
  },
  {
    id: 8,
    refNo: 918715,
    items: 'New Consultation Skin (20300)',
    amount: 0,
    voidedBy: 'Carina Briggs',
    date: '24/07/2020',
  },
  {
    id: 9,
    refNo: 918715,
    items: 'Viviscal Professional - one pack (60 tablets)',
    amount: 0,
    voidedBy: 'Carina Briggs',
    date: '24/07/2020',
  },
  {
    id: 10,
    refNo: 918715,
    items: 'On Account',
    amount: 0,
    voidedBy: 'Carina Briggs',
    date: '24/07/2020',
  },
]
export const financialStatements = [
  {
    id: 1,
    refNo: 918715,
    startDate: '2021-24-07',
    endDate: '2021-28-07',
    issuedTo: 'Carina Briggs',
    location: 'All',
  },
]
export const financeInvIssuingCompanies = [
  {
    key: 'issuing_company',
    value: 'Issuing Company',
  },
  {
    key: 'issuing_company_1',
    value: 'Issuing Company 1',
  },
]
export const financeInvContracts = [
  {
    key: 'contract',
    value: 'Contract',
  },
  {
    key: 'contract_1',
    value: 'Contract 1',
  },
]
export const financeInvAppointment = [
  {
    key: 'PRP',
    value: 'PRP treatment scalp (prepay one of three)',
  },
  {
    key: 'PRP_1',
    value: 'PRP treatment scalp (prepay one of three) 1',
  },
]
export const invoicePaymentMethodOptions = [
  {
    key: 1,
    value: 'Direct Transfer',
  },
  {
    key: 2,
    value: 'Electronic Transfer',
  },
  {
    key: 3,
    value: 'Cash',
  },
  {
    key: 4,
    value: 'Card',
  },
]
export const invoiceEmployeeOptions = [
  {
    label: 'Laura Sutton',
    icon: EmployeeImg,
  },
  {
    label: 'John Doe',
    icon: EmployeeImg,
  },
  {
    label: 'Anika Kadir',
    icon: EmployeeImg,
  },
]
export const invoiceItemsOptions = [
  {
    key: 1,
    value: 'Dispensary - prescription medications',
  },
  {
    key: 2,
    value: 'Viviscal Professional - one pack (60 tablets)',
  },
]
export const invoiceDiscountOptions = [
  {
    key: 0,
    value: 'No Discount',
  },
  {
    key: 20,
    value: 'Senior citizen 20% off',
  },
  {
    key: 30,
    value: 'Special Invited Guest 30% off',
  },
  {
    key: 100,
    value: 'Influencers 100% off',
  },
  {
    key: 90,
    value: 'For the house 90% off',
  },
  {
    key: 50,
    value: 'For the house 50% off',
  },
]
export const invoiceTaxOptions = [
  {
    key: 0,
    value: 'Zero rated (0%)',
  },
  {
    key: 20,
    value: 'Twenty Percent (20%)',
  },
]
export const locationOptions = [
  {
    key: 1,
    value: 'The London Skin and Hair Clinic',
  },
]
export default () => {
  return 'Client Card Mock Data'
}
