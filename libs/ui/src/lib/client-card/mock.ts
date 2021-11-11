import moment from 'moment'
import userAvatar from '../../assets/images/users/user.png'
import laserChin from '../../assets/images/client-card/package/laser-chin.png'
import laserLip from '../../assets/images/client-card/package/laser-lip.png'
import arya from '../../assets/images/users/arya.png'
import linda from '../../assets/images/users/linda.png'
import liza from '../../assets/images/users/liza.png'
import EmployeeImg from './assets/employees/1.png'
import { ReactComponent as LabOrderIcon } from '../../assets/images/lab.svg'
import { ReactComponent as MedicalHistoryIcon } from '../../assets/images/medical-history.svg'
import { ReactComponent as Note } from '../../assets/images/note.svg'
import { ReactComponent as Pencil } from '../../assets/images/pencil.svg'
import { VoucherListProps } from '../client-gift-voucher-layout/ClientGiftVoucherLayout'
import { VoucherCardProps } from '../voucher-card/VoucherCard'
import labTests from '../../assets/images/lab-tests.svg'
import Prescriptions2 from '../../assets/images/user2.png'

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
  fullName: 'Jon Snow',
  firstName: 'Jon',
  lastName: 'Snow',
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
  address: '',
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

export const nextAppointments = [
  {
    category: 'next appointment',
    title: 'Laser - Tattoo Removal with Laura Sutton',
    description: '21/07/2020 (Tue) @ 15:20 @ The London Skin and Hair Clinic',
    image: userAvatar,
  },
  {
    category: 'next appointment',
    title: 'Laser - Tattoo Removal with Laura Sutton',
    description: '21/07/2020 (Tue) @ 15:20 @ The London Skin and Hair Clinic',
    image: userAvatar,
  },
]

export const medicalHistory = [
  {
    category: 'Medical history',
    descriptions: ['History of germ cell tumor ICD 10'],
    date: '21 Mar',
  },
  {
    category: 'Medical history',
    descriptions: ['History of germ cell tumor ICD 10'],
    date: '21 Mar',
  },
]

export const medications = [
  {
    category: 'Medications',
    descriptions: [
      { name: 'Ibuprofen', amount: '10mg' },
      { name: 'Paracetomol', amount: '10mg' },
    ],
    date: '22 Mar',
  },
  {
    category: 'Medications',
    descriptions: [
      { name: 'Ibuprofen', amount: '10mg' },
      { name: 'Paracetomol', amount: '10mg' },
    ],
    date: '22 Mar',
  },
]

export const products = [
  {
    category: 'Products',
    descriptions: ['Obagi Skin Cream'],
    date: '22 Mar',
  },
  {
    category: 'Products',
    descriptions: ['Obagi Skin Cream'],
    date: '21 Mar',
  },
  {
    category: 'Products',
    descriptions: ['Obagi Skin Cream'],
    date: '20 Mar',
  },
]

export const tests = [
  {
    category: 'Tests',
    descriptions: ['Complete blood count'],
    tester: 'Dr Sam Smith',
    date: '15 Jan',
  },
  {
    category: 'Tests',
    descriptions: ['Complete blood count'],
    tester: 'Dr Sam Smith',
    date: '14 Jan',
  },
]

export const conversation = {
  category: 'latest conversations',
  users: [
    {
      id: 1,
      name: 'Dominic Nguyen',
      type: 'Appointment consultation',
      avatarUrl: userAvatar,
      date: '2 Apr',
    },
    {
      id: 2,
      name: 'Tom Coleman',
      type: 'Appointment consultation',
      avatarUrl: userAvatar,
      date: '18 Mar',
    },
    {
      id: 3,
      name: 'Zoltan Olah',
      type: 'Appointment consultation',
      avatarUrl: userAvatar,
      date: '26 Mar',
    },
  ],
}

export const clientAppointments = [
  {
    serviceName: 'Follow up consultation (20310) in clinic',
    employee: { name: 'Jemima Mellerio', avatar: userAvatar },
    status: 'cancelled',
    locationName: 'The London Skin and Hair Clinic',
    createdDate: '2021-06-30T20:15:01Z',
    apptDate: '2021-07-03T20:15:01Z',
    isVirtual: true,
    smsReminder: true,
    emailReminder: true,
    remindersSent: true,
    notes: 'He is unsure about which area to get treated',
  },
  {
    serviceName: 'Virtual Consultation - Acne consultation',
    employee: { name: 'Jemima Mellerio', avatar: userAvatar },
    status: 'no show',
    locationName: 'The London Skin and Hair Clinic',
    createdDate: '2021-07-01T20:15:01Z',
    apptDate: '2021-07-03T20:15:01Z',
    isVirtual: true,
    smsReminder: true,
    emailReminder: true,
    remindersSent: true,
    notes: 'He is unsure about which area to get treated',
  },
  {
    serviceName: 'Virtual Consultation - Acne consultation',
    employee: { name: 'Jemima Mellerio', avatar: userAvatar },
    otherEmployees: [{ name: 'Laura Sutton', avatar: userAvatar }],
    status: 'no show',
    locationName: 'The London Skin and Hair Clinic',
    createdDate: '2021-07-01T20:15:01Z',
    apptDate: '2021-07-03T20:15:01Z',
    isVirtual: true,
    smsReminder: true,
    emailReminder: true,
    remindersSent: true,
  },
  {
    serviceName: 'Virtual Consultation - Acne consultation',
    employee: { name: 'Jemima Mellerio', avatar: userAvatar },
    otherEmployees: [
      { name: 'Laura Sutton', avatar: userAvatar },
      { name: 'Jeff Koons', avatar: userAvatar },
    ],
    status: 'no show',
    locationName: 'The London Skin and Hair Clinic',
    createdDate: '2021-07-01T20:15:01Z',
    apptDate: '2021-07-03T20:15:01Z',
    isVirtual: true,
    smsReminder: true,
    emailReminder: true,
    remindersSent: true,
  },
  {
    serviceName: 'Virtual Consultation - Acne consultation',
    employee: { name: 'Jemima Mellerio', avatar: userAvatar },
    status: 'no show',
    locationName: 'The London Skin and Hair Clinic',
    createdDate: '2021-07-01T20:15:01Z',
    apptDate: '2021-07-03T20:15:01Z',
    isVirtual: true,
    smsReminder: true,
    emailReminder: true,
    remindersSent: true,
  },
  {
    serviceName: 'Virtual Consultation - Acne consultation',
    employee: { name: 'Jemima Mellerio', avatar: userAvatar },
    status: 'waiting',
    locationName: 'The London Skin and Hair Clinic',
    createdDate: '2021-06-30T20:15:01Z',
    apptDate: '2021-08-03T20:15:01Z',
    isVirtual: true,
    smsReminder: true,
    emailReminder: true,
    remindersSent: true,
  },
  {
    serviceName: 'Virtual Consultation - Acne consultation',
    employee: { name: 'Jemima Mellerio', avatar: userAvatar },
    status: 'waiting',
    locationName: 'The London Skin and Hair Clinic',
    createdDate: '2021-06-30T20:15:01Z',
    apptDate: '2021-08-03T20:15:01Z',
    isVirtual: true,
    smsReminder: true,
    emailReminder: true,
    remindersSent: true,
  },
  {
    serviceName: 'Virtual Consultation - Acne consultation',
    employee: { name: 'Jemima Mellerio', avatar: userAvatar },
    status: 'waiting',
    locationName: 'The London Skin and Hair Clinic',
    createdDate: '2021-06-30T20:15:01Z',
    apptDate: '2021-08-03T20:15:01Z',
    isVirtual: true,
    smsReminder: true,
    emailReminder: true,
    remindersSent: true,
  },
  {
    serviceName: 'Virtual Consultation - Acne consultation',
    employee: { name: 'Jemima Mellerio', avatar: userAvatar },
    status: 'waiting',
    locationName: 'The London Skin and Hair Clinic',
    createdDate: '2021-06-30T20:15:01Z',
    apptDate: '2021-08-03T20:15:01Z',
    isVirtual: true,
    smsReminder: true,
    emailReminder: true,
    remindersSent: true,
  },
  {
    serviceName: 'Virtual Consultation - Acne consultation',
    employee: { name: 'Jemima Mellerio', avatar: userAvatar },
    status: 'waiting',
    locationName: 'The London Skin and Hair Clinic',
    createdDate: '2021-06-30T20:15:01Z',
    apptDate: '2021-08-03T20:15:01Z',
    isVirtual: true,
    smsReminder: true,
    emailReminder: true,
    remindersSent: true,
  },
  {
    serviceName: 'Virtual Consultation - Acne consultation',
    employee: { name: 'Jemima Mellerio', avatar: userAvatar },
    status: 'waiting',
    locationName: 'The London Skin and Hair Clinic',
    createdDate: '2021-06-30T20:15:01Z',
    apptDate: '2021-08-03T20:15:01Z',
    isVirtual: true,
    smsReminder: true,
    emailReminder: true,
    remindersSent: true,
  },
  {
    serviceName: 'Virtual Consultation - Acne consultation',
    employee: { name: 'Jemima Mellerio', avatar: userAvatar },
    status: 'waiting',
    locationName: 'The London Skin and Hair Clinic',
    createdDate: '2021-06-30T20:15:01Z',
    apptDate: '2021-08-03T20:15:01Z',
    isVirtual: true,
    smsReminder: true,
    emailReminder: true,
    remindersSent: true,
  },
  {
    serviceName: 'Virtual Consultation - Acne consultation',
    employee: { name: 'Jemima Mellerio', avatar: userAvatar },
    status: 'waiting',
    locationName: 'The London Skin and Hair Clinic',
    createdDate: '2021-06-30T20:15:01Z',
    apptDate: '2021-08-03T20:15:01Z',
    isVirtual: true,
    smsReminder: true,
    emailReminder: true,
    remindersSent: true,
  },
  {
    serviceName: 'Virtual Consultation - Acne consultation',
    employee: { name: 'Jemima Mellerio', avatar: userAvatar },
    status: 'waiting',
    locationName: 'The London Skin and Hair Clinic',
    createdDate: '2021-06-30T20:15:01Z',
    apptDate: '2021-08-03T20:15:01Z',
    isVirtual: true,
    smsReminder: true,
    emailReminder: true,
    remindersSent: true,
  },
  {
    serviceName: 'Virtual Consultation - Acne consultation',
    employee: { name: 'Jemima Mellerio', avatar: userAvatar },
    status: 'waiting',
    locationName: 'The London Skin and Hair Clinic',
    createdDate: '2021-06-30T20:15:01Z',
    apptDate: '2021-08-03T20:15:01Z',
    isVirtual: true,
    smsReminder: true,
    emailReminder: true,
    remindersSent: true,
  },
  {
    serviceName: 'Virtual Consultation - Acne consultation',
    employee: { name: 'Jemima Mellerio', avatar: userAvatar },
    status: 'waiting',
    locationName: 'The London Skin and Hair Clinic',
    createdDate: '2021-06-30T20:15:01Z',
    apptDate: '2021-08-03T20:15:01Z',
    isVirtual: true,
    smsReminder: true,
    emailReminder: true,
    remindersSent: true,
  },
]

export const thirdPartySearchResults = [
  {
    name: 'Deddington Health Centre',
    postCode: 'OX15 0TQ',
    city: 'Deddington',
    street: 'Banbury',
    country: 'United Kingdom',
    phone: '+44 (0) 1869338611',
  },
  {
    name: 'Deddington Lorem Health Centre',
    postCode: 'OX15 4TN',
    city: 'Deddington',
    street: 'Banbury',
    country: 'United Kingdom',
    phone: '+44 (0) 1869338611',
  },
]

export const appointments = [
  {
    id: '1',
    firstName: 'Bruno',
    lastName: 'Ballardin',
    avatarUrl: userAvatar,
    mobile: '383299103',
    email: 'bruno.barllardin@sample.io',
  },
]

export const clientPackages = [
  {
    id: '1',
    thumbnail: laserChin,
    avatar: arya,
    packageName: 'Laser / Chin',
    packageUsage: 6,
    expDate: moment().add(1, 'years').format('YYYY-MM-DD'),
    actDate: '2021-07-21',
    valueEach: 0,
    used: 0,
    invoice: 0,
    lastSaw: 'John Smith',
    lastVisited: '2021-02-15',
  },
  {
    id: '2',
    thumbnail: laserLip,
    avatar: linda,
    packageName: 'Laser / Lip',
    packageUsage: 6,
    expDate: moment().add(1, 'years').format('YYYY-MM-DD'),
    actDate: '2021-07-21',
    valueEach: 0,
    used: 5,
    invoice: 0,
    lastSaw: 'John Smith',
    lastVisited: '2021-06-30',
  },
  {
    id: '3',
    thumbnail: laserLip,
    avatar: liza,
    packageName: 'Laser / Lip',
    packageUsage: 6,
    expDate: '2021-07-01',
    actDate: '2021-07-01',
    valueEach: 0,
    used: 6,
    invoice: 0,
    lastSaw: 'John Smith',
    lastVisited: '2021-08-15',
  },
]

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
      subtotal: 2250,
      tips: 0,
      grandTotal: 2250,
      paymentStatus: 2,
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
      paid: true,
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
      paymentStatus: 2,
    },
    {
      id: '9233432',
      date: '10/12/2020',
      location: 'The London Skin and Hair Clinic',
      employee: 'Anika Kadir',
      issuedTo: 'Bruno Ballardin',
      paid: false,
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
      paid: false,
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
      paid: false,
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

export const invoicePaymentMethodOptions = [
  {
    key: 1,
    value: 'Direct Transfer',
  },
  {
    key: 2,
    value: 'Electronic Transfer',
  },
]

export const locationOptions = [
  {
    key: 1,
    value: 'The London Skin and Hair Clinic',
  },
]

export const financialPayments = [
  {
    id: 1,
    date: '10/12/2020',
    invoiceNo: 4564,
    paymentNo: 923345,
    location: 'The London Skin and Hair Clinic',
    employee: 'Anika Kadir',
    paidBy: 'Bruno Ballardin',
    method: 'Stripe',
    amount: 28,
  },
  {
    id: 2,
    date: '10/12/2020',
    invoiceNo: 4564,
    paymentNo: 923345,
    location: 'The London Skin and Hair Clinic',
    employee: 'Anika Kadir',
    paidBy: 'Bruno Ballardin',
    method: 'Stripe',
    amount: 28,
  },
  {
    id: 3,
    date: '10/12/2020',
    invoiceNo: 4564,
    paymentNo: 923345,
    location: 'The London Skin and Hair Clinic',
    employee: 'Anika Kadir',
    paidBy: 'Bruno Ballardin',
    method: 'Stripe',
    amount: 28,
  },
  {
    id: 4,
    date: '10/12/2020',
    invoiceNo: 4564,
    paymentNo: 923345,
    location: 'The London Skin and Hair Clinic',
    employee: 'Anika Kadir',
    paidBy: 'Bruno Ballardin',
    method: 'Stripe',
    amount: 28,
  },
  {
    id: 5,
    date: '10/12/2020',
    invoiceNo: 4564,
    paymentNo: 923345,
    location: 'The London Skin and Hair Clinic',
    employee: 'Anika Kadir',
    paidBy: 'Bruno Ballardin',
    method: 'Stripe',
    amount: 28,
  },
  {
    id: 6,
    date: '10/12/2020',
    invoiceNo: 4564,
    paymentNo: 923345,
    location: 'The London Skin and Hair Clinic',
    employee: 'Anika Kadir',
    paidBy: 'Bruno Ballardin',
    method: 'Stripe',
    amount: 28,
  },
  {
    id: 7,
    date: '10/12/2020',
    invoiceNo: 4564,
    paymentNo: 923345,
    location: 'The London Skin and Hair Clinic',
    employee: 'Anika Kadir',
    paidBy: 'Bruno Ballardin',
    method: 'Stripe',
    amount: 28,
  },
  {
    id: 8,
    date: '10/12/2020',
    invoiceNo: 4564,
    paymentNo: 923345,
    location: 'The London Skin and Hair Clinic',
    employee: 'Anika Kadir',
    paidBy: 'Bruno Ballardin',
    method: 'Stripe',
    amount: 28,
  },
  {
    id: 9,
    date: '10/12/2020',
    invoiceNo: 4564,
    paymentNo: 923345,
    location: 'The London Skin and Hair Clinic',
    employee: 'Anika Kadir',
    paidBy: 'Bruno Ballardin',
    method: 'Stripe',
    amount: 28,
  },
  {
    id: 10,
    date: '10/12/2020',
    invoiceNo: 4564,
    paymentNo: 923345,
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
    startDate: '24/07/2021',
    endDate: '28/07/2021',
    issuedTo: 'Carina Briggs',
    location: 'All',
  },
]
export const serviceData = [
  {
    title: 'Select all',
    key: 'all',
    children: [
      {
        title: 'Seasonal Offers',
        key: 'Seasonal Offers',
        children: [
          {
            title: '4 ml contour package',
            key: '4 ml contour package',
          },
          {
            title: '2 ml contour',
            key: '2 ml contour',
          },
          {
            title: '1 ml filler',
            key: '1 ml filler',
          },
        ],
      },
      {
        title: 'Special Offers (12)',
        key: 'Special Offers',
        children: [
          {
            title: '4 ml contour package',
            key: '4 ml contour package special',
          },
        ],
      },
      {
        title: 'Face Services (23)',
        key: 'Face Services',
        children: [
          {
            title: '4 ml contour package',
            key: '4 ml contour package face',
          },
        ],
      },
      {
        title: 'Hair Services (23)',
        key: 'Hair Services',
        children: [
          {
            title: '4 ml contour package',
            key: '4 ml contour package hair',
          },
        ],
      },
    ],
  },
]

export const vouchers = (): Record<string, VoucherListProps[]> => {
  const voucher: VoucherCardProps = {
    cardWidth: 500,
    backgroundColor1: '#9013FE',
    backgroundColor2: '#BD10E0',
    borderColor: '#000',
    gradientType: 'linear-gradient',
    bookNowButton: false,
    voucherPrice: 100,
    voucherPriceLabel: 'Voucher Value',
    voucherSoldPrice: 100,
    voucherSoldPriceLabel: 'Sold 5',
    voucherRelation: 'Family',
    voucherRelationLabel: 'Redeem on all services',
    currencyType: '£',
    showMenu: true,
    buttonLabel: '',
    voucherType: '',
    termsConditions:
      'lorem ipsum, quia dolor sit, amet, consectetur, adipiscivelit, sed quia non numquam eius modi tempora incidunt, utlabore et dolore magnam aliquam quaerat voluptatem.',
    onMenuClick: () => {
      return
    },
  }

  const activeVouchers: VoucherListProps[] = [
    {
      id: 1,
      validTill: '2021-08-30T11:50:05.916Z',
      voucher: {
        ...voucher,
        backgroundColor1: '#5AA8FF',
        backgroundColor2: '#077DFF',
      },
    },
    {
      id: 2,
      validTill: '2021-08-01T11:50:05.916Z',
      voucher: {
        ...voucher,
        backgroundColor1: '#FDB720',
        backgroundColor2: '#E86D22',
      },
    },
  ]

  const expiredVouchers: VoucherListProps[] = [
    {
      id: 3,
      validTill: '2019-07-31T10:04:25.000Z',
      voucher: {
        ...voucher,
      },
    },
  ]

  return {
    activeVouchers,
    expiredVouchers,
  }
}

export const testList = [
  {
    id: 1,
    name: 'DL7 Lab Profile',
    orderNo: '284957392',
    date: '2021-08-21T08:30:00.00Z',
    tester: 'William Brandham',
    laboratory: 'TDL Labratory',
    img: labTests,
    testStatus: 'Received',
    isPreviewAvailable: true,
  },

  {
    id: 2,
    name: 'DL7 Lab Profile',
    orderNo: '284957392',
    date: '2021-08-21T08:30:00.00Z',
    tester: 'William Brandham',
    laboratory: 'TDL Labratory',
    img: labTests,
    testStatus: 'Awaiting results',
    isPreviewAvailable: false,
  },
  {
    id: 3,
    name: 'H5 Blood Test',
    orderNo: '284957392',
    date: '2021-08-21T08:30:00.00Z',
    tester: 'William Brandham',
    laboratory: 'TDL Labratory',
    img: labTests,
    testStatus: 'Received',
    isPreviewAvailable: true,
  },
]

export const prescriptions = [
  {
    id: 1,
    name: 'Minoxidil 2mg',
    date: '2021-08-21T08:30:00.00Z',
    img: labTests,
    isRepeated: false,
    details: {
      date: '2019-11-01T00:00:00Z',
      perWeek: '150 mg every 2 weeks',
      perDay: '75 mg/ml, 1',
    },
  },
  {
    id: 2,
    name: 'Minoxidil 2mg',
    date: '2021-08-21T08:30:00.00Z',
    img: Prescriptions2,
    isRepeated: false,
    details: {
      date: '2019-11-01T00:00:00Z',
      perWeek: '150 mg every 2 weeks',
      perDay: '75 mg/ml, 1',
    },
  },
  {
    id: 3,
    name: 'Minoxidil 2mg',
    date: '2021-08-21T08:30:00.00Z',
    img: labTests,
    isRepeated: false,
    details: {
      date: '2019-11-01T00:00:00Z',
      perWeek: '150 mg every 2 weeks',
      perDay: '75 mg/ml, 1',
    },
  },
]

export const communicationEventsData = [
  {
    id: 1,
    type: 'sms',
    eventName: 'Scheduled SMS: Appointment 21 May with Ben Ballardin',
    moved: { from: { name: 'Vedran Taneski' }, to: { name: 'Ben Gough' } },
    description:
      'Hi! Please confirm your appointment with Dr. Kovalsky at Skin Health Clinic at 21 May at 14:00.',
    dateTime: '17-07-2022, 03:00 pm',
  },
  {
    id: 2,
    type: 'mail',
    eventName: 'Your Feedback',
    description:
      'Dear Mr. Ballardin, You are attending London and I think it is a great opportunity to see your therapist and hear some feedback on your recent pains. Please let me know and I will schedule an appointment for you and Dr. Kovalsky. I hope you will get better an...',
    dateTime: '05-07-2021, 12:00 pm',
    moved: { from: { name: 'Vedran Taneski' }, to: { name: 'Ben Gough' } },
    openedBy: [
      { firstName: 'Alexis', lastName: 'Moor' },
      { firstName: 'William', lastName: 'Brandham' },
    ],
    pinItems: [
      {
        item:
          'https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf',
      },
      {
        item: 'http://www.africau.edu/images/default/sample.pdf',
      },
      {
        item:
          'https://i.pinimg.com/originals/a3/f7/01/a3f70197315949b3f320764a8a194c32.jpg',
      },
    ],
    displayCollapse: true,
  },
  {
    id: 3,
    type: 'mail',
    eventName: 'Your Feedback',
    description:
      'Dear Mr. Ballardin, You are attending London and I think it is a great opportunity to see your therapist and hear some feedback on your recent pains. Please let me know and I will schedule an appointment for you and Dr. Kovalsky. I hope you will get better an...',
    dateTime: '05-07-2021, 12:00 pm',
    moved: { from: { name: 'Vedran Taneski' }, to: { name: 'Ben Gough' } },
    openedBy: [
      { firstName: 'Alexis', lastName: 'Moor' },
      { firstName: 'William', lastName: 'Brandham' },
    ],
    displayCollapse: true,
  },
  {
    id: 4,
    type: 'letter',
    eventName: 'Printed',
    description:
      'Dear Smith, I saw this lovely 40 year old gentleman for a removal of a mole',
    dateTime: '03-07-2021, 12:00 pm',
    status: 'Awaiting Correction',
    moved: { from: { name: 'Vedran Taneski' }, to: { name: 'Ben Gough' } },
    displayCollapse: true,
  },
  {
    id: 5,
    type: 'mail',
    eventName: 'We Are Remaining Open for In-Clinic Appointments',
    description:
      'Dear Mr. Ballardin, You are attending London and I think it is a great opportunity to see your therapist and hear some feedback on your recent pains. Please let me know and I will schedule an appointment for you and Dr. Kovalsky. I hope you will get better an...',
    dateTime: '02-07-2021, 12:00 pm',
    moved: { from: { name: 'Vedran Taneski' }, to: { name: 'Ben Gough' } },
    openedBy: [
      { firstName: 'Alexis', lastName: 'Moor' },
      { firstName: 'William', lastName: 'Brandham' },
    ],
    displayCollapse: true,
  },
  {
    id: 6,
    type: 'mail',
    eventName: 'We Are Remaining Open for In-Clinic Appointments',
    description:
      'Dear Mr. Ballardin, You are attending London and I think it is a great opportunity to see your therapist and hear some feedback on your recent pains. Please let me know and I will schedule an appointment for you and Dr. Kovalsky. I hope you will get better an...',
    dateTime: '02-07-2021, 12:00 pm',
    moved: { from: { name: 'Vedran Taneski' }, to: { name: 'Ben Gough' } },
    openedBy: [
      { firstName: 'Alexis', lastName: 'Moor' },
      { firstName: 'William', lastName: 'Brandham' },
    ],
    displayCollapse: true,
  },
  {
    id: 9,
    type: 'call',
    eventName: 'Outbound call to Ben Ballardin',
    moved: { from: { name: 'Vedran Taneski' }, to: { name: 'Ben Gough' } },
    dateTime: '10-04-2021, 12:00 pm',
  },
  {
    id: 7,
    type: 'sms',
    eventName: 'Appointment 13 Mar with Ben Ballardin',
    moved: { from: { name: 'Vedran Taneski' }, to: { name: 'Ben Gough' } },
    description:
      'Hi! Please let me know if you want to cancel your appointment',
    status: 'Failed',
    dateTime: '01-07-2021, 03:00 pm',
  },
  {
    id: 8,
    type: 'sms',
    eventName: 'Appointment 13 Mar with Ben Ballardin',
    moved: { from: { name: 'Vedran Taneski' }, to: { name: 'Ben Gough' } },
    description:
      'Hi! Please let me know if you want to cancel your appointment',
    dateTime: '01-07-2021, 03:00 pm',
  },
  {
    id: 10,
    type: 'voice',
    eventName: 'GP Referral dictation',
    authorName: 'Vedran Taneski',
    dateTime: '10-04-2021, 12:00 pm',
    audioFile: 'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3',
  },
  {
    id: 11,
    type: 'letter',
    eventName:
      'Your Medical Report from The London Skin and Hair Clinic (Test)',
    description:
      'Dear Smith, I saw this lovely 40 year old gentleman for a removal of a mole',
    dateTime: '03-07-2021, 11:00 pm',
    status: 'Awaiting review',
    moved: { from: { name: 'Vedran Taneski' }, to: { name: 'Ben Gough' } },
    displayCollapse: true,
  },
  {
    id: 12,
    type: 'letter',
    eventName:
      'Your Medical Report from The London Skin and Hair Clinic (Test)',
    description:
      'Dear Smith, I saw this lovely 40 year old gentleman for a removal of a mole',
    dateTime: '03-07-2021, 10:00 pm',
    status: 'Completed',
    moved: { from: { name: 'Vedran Taneski' }, to: { name: 'Ben Gough' } },
    displayCollapse: true,
    sharedWith: [
      { firstName: 'Alexis', lastName: 'Moor' },
      { firstName: 'William', lastName: 'Brandham' },
    ],
  },
]

export const loyaltyData = [
  {
    id: 1,
    date: '2020-07-23T17:30:00.007Z',
    time: '17:34',
    action: 'Purchaising each service - at ringup only',
    points: '+30.00',
  },
  {
    id: 2,
    date: '2020-07-22T17:30:00.007Z',
    time: '16:25',
    action: 'Percantage paid on spend - at ringup only',
    points: '+5.00',
  },
  {
    id: 3,
    date: '2020-07-19T17:30:00.007Z',
    time: '16:25',
    action: 'Percantage paid on spend - at ringup only',
    points: '+5.00',
  },
  {
    id: 4,
    date: '2020-07-19T17:30:00.007Z',
    time: '16:25',
    action: 'Purchaising each service - at ringup only',
    points: '+5.00',
  },
  {
    id: 5,
    date: '2020-07-19T17:30:00.007Z',
    time: '16:25',
    action: 'Percantage paid on spend - at ringup only',
    points: '+5.00',
  },
  {
    id: 6,
    date: '2020-07-19T17:30:00.007Z',
    time: '16:25',
    action: 'Percantage paid on spend - at ringup only',
    points: '+5.00',
  },
  {
    id: 7,
    date: '2020-07-19T17:30:00.007Z',
    time: '16:25',
    action: 'Purchaising each service - at ringup only',
    points: '+5.00',
  },
  {
    id: 8,
    date: '2020-07-19T17:30:00.007Z',
    time: '16:25',
    action: 'Purchaising each service - at ringup only',
    points: '+5.00',
  },
  {
    id: 9,
    date: '2020-07-19T17:30:00.007Z',
    time: '16:25',
    action: 'Percantage paid on spend - at ringup only',
    points: '+5.00',
  },
  {
    id: 10,
    date: '2020-07-19T17:30:00.007Z',
    time: '16:25',
    action: 'Percantage paid on spend - at ringup only',
    points: '+5.00',
  },
]

export const ActivityEventsData = [
  {
    id: 1,
    type: 'lostEmail',
    eventName: 'Send brochure Lost Email',
    clientName: 'Kane',
    dateTime: '30-06-2022, 3:15 pm',
    taskChecked: false,
    taskUserName: 'Jeremy Epstein',
  },
  {
    id: 2,
    type: 'call',
    eventName: 'Call to Bruno Ballardin',
    clientName: 'Kane',
    dateTime: '29-06-2022, 3:15 pm',
    taskChecked: false,
    taskUserName: 'Jeremy Epstein',
  },
  {
    id: 3,
    type: 'email',
    eventName: 'Email to Bruno Ballardin',
    clientName: 'Kane',
    dateTime: '28-06-2022, 3:15 pm',
    taskChecked: false,
    taskUserName: 'Jeremy Epstein',
  },
  {
    id: 4,
    type: 'letter',
    eventName: 'Send letter to Bruno Ballardin',
    clientName: 'Kane',
    dateTime: '27-06-2022, 3:15 pm',
    taskChecked: false,
    taskUserName: 'Jeremy Epstein',
  },
  {
    id: 5,
    type: 'sms',
    eventName: 'Send SMS',
    clientName: 'Kane',
    dateTime: '26-06-2022, 3:15 pm',
    taskChecked: false,
    taskUserName: 'Jeremy Epstein',
  },
  {
    id: 6,
    type: 'lostEmail',
    eventName: 'Send brochure Lost Email',
    clientName: 'Kane',
    dateTime: '18-06-2021, 3:15 pm',
    taskChecked: true,
    taskUserName: 'Jeremy Epstein',
  },
  {
    id: 7,
    type: 'sms',
    eventName: 'Send SMS',
    clientName: 'Kane',
    dateTime: '14-05-2021, 3:15 pm',
    taskChecked: true,
    taskUserName: 'Jeremy Epstein',
  },
  {
    id: 8,
    type: 'call',
    eventName: 'Call to Bruno Ballardin',
    clientName: 'Kane',
    dateTime: '14-05-2021, 3:15 pm',
    taskChecked: true,
    taskUserName: 'Jeremy Epstein',
  },
  {
    id: 9,
    type: 'email',
    eventName: 'Email to Bruno Ballardin',
    clientName: 'Kane',
    dateTime: '14-05-2021, 3:15 pm',
    taskChecked: true,
    taskUserName: 'Jeremy Epstein',
  },
  {
    id: 10,
    type: 'letter',
    eventName: 'Send letter to Bruno Ballardin',
    clientName: 'Kane',
    dateTime: '14-05-2021, 3:15 pm',
    taskChecked: true,
    taskUserName: 'Jeremy Epstein',
  },
  {
    id: 11,
    type: 'lostEmail',
    eventName: 'Send brochure Lost Email',
    clientName: 'Kane',
    dateTime: '14-05-2021, 3:15 pm',
    taskChecked: true,
    taskUserName: 'Jeremy Epstein',
  },
]

const formData = {
  patient: 'Bruno Ballardin',
  lastUpdate: '2021-03-01T00:00:00Z',
  createdOn: '2021-03-01T00:00:00Z',
  createdBy: 'Bruno Ballardin',
  electronicOrderNo: 'AA3655583543',
  to:
    'The Doctors Laboratory, 76 Wimpole Street, London, W1G 9RT Tel: 020 7307 7373',
  requestingDoctor: 'Dr. Anna Chapman',
  requestDate: '2021-03-01T00:00:00Z',
  patientId: '326',
  requestId: 'AA3655583543',
  dob: '1969-11-28T00:00:00Z',
  gender: 'Male',
  labsTests: 'LSH4 (Roaccutane): FBC, U+es, LFTs, Lipid profile',
  additionalTests: 'Allergy profile 1, Cadmium, Plutonium',
  fasting: 'Yes',
  clinicalDetails: 'Acne - severe adult',
  dateSampleTaken: '–',
  timeSampleTaken: '–',
}

export const formFilterButtons = [
  {
    id: 1,
    type: 'Treatment',
    selected: true,
    icon: Note,
  },
  {
    id: 2,
    type: 'Consent',
    selected: true,
    icon: Pencil,
  },
  {
    id: 3,
    type: 'Medical History',
    selected: true,
    icon: MedicalHistoryIcon,
  },
  {
    id: 4,
    type: 'Lab Request',
    selected: true,
    icon: LabOrderIcon,
  },
]

export const forms = [
  {
    id: 1,
    name: 'LSAH Bloods or Swab Lab Request Form',
    user: 'Bruno Ballardin',
    created: '2021-08-21T08:30:00.00Z',
    type: 'Lab Request',
    icon: LabOrderIcon,
    isPinned: false,
    isAdminForm: false,
    data: formData,
  },
  {
    id: 2,
    name: 'Botox Treatment Form',
    user: 'Erika Chapman',
    created: '2021-08-20T08:30:00.00Z',
    type: 'Treatment',
    icon: Note,
    isPinned: false,
    isAdminForm: false,
    data: {
      ...formData,
      patient: 'Erika Chapman',
      createdBy: 'Erika Chapman',
    },
  },
  {
    id: 3,
    name: 'COVID 19 Consent Form',
    user: 'John Smith',
    created: '2021-08-19T08:30:00.00Z',
    type: 'Consent',
    icon: Pencil,
    isPinned: false,
    isAdminForm: false,
    data: {
      ...formData,
      patient: 'John Smith',
      createdBy: 'John Smith',
    },
  },
  {
    id: 4,
    name: 'Medical History Form',
    user: 'Jane Rache',
    created: '2021-08-18T08:30:00.00Z',
    type: 'Medical History',
    icon: MedicalHistoryIcon,
    isPinned: false,
    isAdminForm: true,
    data: {
      ...formData,
      patient: 'Jane Rache',
      createdBy: 'Jane Rache',
    },
  },
]
