export const packageData = [
  {
    key: '1',
    name: 'Book Now Link',
    quantity: [
      {
        id: 1,
        name: 'Dominic Nguyen',
        avatarUrl: 'https://avatars2.githubusercontent.com/u/132554',
      },
      {
        id: 2,
        name: 'Tom Coleman',
        avatarUrl: 'https://avatars2.githubusercontent.com/u/132554',
      },
      {
        id: 3,
        name: 'Zoltan Olah',
        avatarUrl: 'https://avatars0.githubusercontent.com/u/81672',
      },
      {
        id: 4,
        name: 'Tim Hingston',
        avatarUrl: 'https://avatars3.githubusercontent.com/u/1831709',
      },
    ],
    is_active: true,
  },
  {
    key: '2',
    name: 'From a friend',
    quantity: [
      {
        id: 1,
        name: 'Dominic Nguyen',
        avatarUrl: 'https://avatars2.githubusercontent.com/u/132554',
      },
      {
        id: 2,
        name: 'Tom Coleman',
        avatarUrl: 'https://avatars2.githubusercontent.com/u/132554',
      },
      {
        id: 3,
        name: 'Zoltan Olah',
        avatarUrl: 'https://avatars0.githubusercontent.com/u/81672',
      },
      {
        id: 4,
        name: 'Tim Hingston',
        avatarUrl: 'https://avatars3.githubusercontent.com/u/1831709',
      },
    ],
    is_active: true,
  },
  {
    key: '3',
    name: 'Instagram',
    quantity: [
      {
        id: 1,
        name: 'Dominic Nguyen',
        avatarUrl: 'https://avatars2.githubusercontent.com/u/132554',
      },
      {
        id: 2,
        name: 'Tom Coleman',
        avatarUrl: 'https://avatars2.githubusercontent.com/u/132554',
      },
      {
        id: 3,
        name: 'Zoltan Olah',
        avatarUrl: 'https://avatars0.githubusercontent.com/u/81672',
      },
      {
        id: 4,
        name: 'Tim Hingston',
        avatarUrl: 'https://avatars3.githubusercontent.com/u/1831709',
      },
    ],
    is_active: true,
  },
]

export const coursesData = [
  {
    key: '1',
    id: '1',
    name: 'Hydrafacial (x3)',
    service: 'Botox – 1 Area',
    session: 3,
    is_active: true,
  },
  {
    key: '2',
    id: '2',
    name: 'Hydrafacial – 1 day',
    service: 'Hydrafacial',
    session: 3,
    is_active: true,
  },
  {
    key: '3',
    id: '3',
    name: 'Facial – 1 month',
    service: 'Facial',
    session: 3,
    is_active: true,
  },
]

export const coursesColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    className: 'drag-visible',
    visible: true,
  },
  {
    title: 'Service',
    dataIndex: 'service',
    className: 'drag-visible',
    visible: true,
  },
  {
    title: 'Sessions',
    dataIndex: 'session',
    className: 'drag-visible',
    visible: true,
  },
  {
    title: 'Status',
    dataIndex: 'is_active',
    className: 'drag-visible',
    visible: true,
  },
]

export const employeeList = [
  {
    name: 'Jessica Winter',
    selected: false,
  },
  {
    name: 'Jeff Hackley',
    selected: false,
  },
  {
    name: 'Alexander Wang',
    selected: false,
  },
  {
    name: 'Linda Davis',
    selected: false,
  },
  {
    name: 'William Tyson',
    selected: false,
  },
  {
    name: 'Max Starck',
    selected: false,
  },
  {
    name: 'Kyle Walsh',
    selected: false,
  },
  {
    name: 'Owen Phillips',
    selected: false,
  },
  {
    name: 'Aidan Kelly',
    selected: false,
  },
  {
    name: 'Ewan Morgan',
    selected: false,
  },
  {
    name: 'Jordan Martin',
    selected: false,
  },
  {
    name: 'Grant Dudley',
    selected: false,
  },
]

export const TaxOption = ['Tax 1', 'Tax 2', 'Tax 3']

export const courseSchema: Schema = {
  full: 'Course',
  fullLower: 'course',
  short: 'Course',
  shortLower: 'course',
  createButtonLabel: 'New Course',
  messages: {
    create: {
      success: 'You have successfully created a course',
      error: 'While creating a course',
    },
    update: {
      success: 'You have successfully updated a course',
      error: 'While updating a course',
    },
    delete: {
      success: 'You have successfully deleted a course',
      error: 'While deleting a course',
    },
  },
  fields: {
    name: {
      full: 'Name',
      fullLower: 'name',
      short: 'Name',
      shortLower: 'name',
      min: 2,
      example: 'Surgical lab',
      cssWidth: 'max',
      type: 'string',
    },
    service: {
      full: 'Service',
      type: 'string',
      example: 'Surgical lab',
    },
    sessions: {
      full: 'Sessions',
      type: 'string',
      example: 'Surgical lab',
    },
    is_active: {
      full: 'Status',
      type: 'boolean',
      defaultvalue: true,
    },
  },
}

export const packageSchema: Schema = {
  full: 'Packages',
  fullLower: 'packages',
  short: 'Packages',
  shortLower: 'packages',
  createButtonLabel: 'New Package',
  messages: {
    create: {
      success: 'You have successfully created a package',
      error: 'While creating a package',
    },
    update: {
      success: 'You have successfully updated a package',
      error: 'While updating a package',
    },
    delete: {
      success: 'You have successfully deleted a package',
      error: 'While deleting a package',
    },
  },
  fields: {
    name: {
      full: 'Name',
      fullLower: 'name',
      short: 'Name',
      shortLower: 'name',
      min: 2,
      example: 'Surgical lab',
      cssWidth: 'max',
      type: 'string',
    },
    quantity: {
      full: 'Quantity',
      type: 'string',
      example: 'Surgical lab',
    },
    is_active: {
      full: 'Status',
      type: 'boolean',
      defaultvalue: true,
    },
  },
}

export const buildPackagesColumnsData = [
  {
    key: '1',
    service: 'Treatment',
    quantity: 10,
    price: '£650.00',
    online_purchase: true,
  },
  {
    key: '2',
    service: 'Treatment',
    quantity: 20,
    price: '£650.00',
    online_purchase: true,
  },
  {
    key: '3',
    service: 'Treatment',
    quantity: 10,
    price: '£650.00',
    online_purchase: true,
  },
  {
    key: '4',
    service: 'Treatment',
    quantity: 20,
    price: '£650.00',
    online_purchase: true,
  },
  {
    key: '5',
    service: 'Treatment',
    quantity: 20,
    price: '£650.00',
    online_purchase: true,
  },
  {
    key: '6',
    service: 'Treatment',
    quantity: 20,
    price: '£650.00',
    online_purchase: true,
  },
  {
    key: '7',
    service: 'Treatment',
    quantity: 20,
    price: '£650.00',
    online_purchase: true,
  },
  {
    key: '8',
    service: 'Total',
    quantity: 120,
    price: '£4550.00',
    online_purchase: false,
  },
]
