import userAvatar from '../../assets/images/users/austin.png'

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
  avatar: userAvatar,
  isActive: true,
  cardOption: '',
  labels: ['#coporate', '#new-patient', 'new client', '2 no shows'],
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
