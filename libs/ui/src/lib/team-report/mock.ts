export const dataSource = [
  {
    key: 0,
    desc: 'PAYROLL',
    type: 'header',
    header_num: 0,
  },
  {
    key: 1,
    desc: 'Team Comission',
    'name-1': '£ 100,000.00',
    'name-2': '£ 100,000.00',
    'name-3': '£ 100,000.00',
    'name-4': '£ 100,000.00',
    'name-5': '£ 100,000.00',
    total: '£ 500,000.00',
  },
  {
    key: 2,
    desc: 'Team Wages',
    'name-1': '£ 3,500.00',
    'name-2': '£ 3,500.00',
    'name-3': '£ 3,500.00',
    'name-4': '£ 3,500.00',
    'name-5': '£ 3,500.00',
    total: '£ 17,500.00',
  },
  {
    key: 3,
    desc: 'Total',
    'name-1': '£ 103,500.00',
    'name-2': '£ 103,500.00',
    'name-3': '£ 103,500.00',
    'name-4': '£ 103,500.00',
    total: '£ 517,500.00',
    type: 'summary',
  },
  {
    key: 4,
    desc: 'SHIFTS',
    type: 'header',
    header_num: 1,
  },
  {
    key: 5,
    desc: 'Days Worked',
    'name-1': {
      value: '12.5',
      badge: 'success',
    },
    'name-2': {
      value: '12.5',
      badge: 'success',
    },
    'name-3': {
      value: '12.5',
      badge: 'success',
    },
    'name-4': {
      value: '12.5',
      badge: 'success',
    },
    'name-5': {
      value: '12.5',
      badge: 'success',
    },
    total: {
      value: '62.5',
      badge: 'success',
    },
  },
  {
    key: 6,
    desc: 'Days Off',
    'name-1': {
      value: '8',
      badge: 'success',
    },
    'name-2': {
      value: '8',
      badge: 'success',
    },
    'name-3': {
      value: '8',
      badge: 'success',
    },
    'name-4': {
      value: '8',
      badge: 'success',
    },
    'name-5': {
      value: '8',
      badge: 'success',
    },
    total: {
      value: '40',
      badge: 'success',
    },
    children: [
      {
        key: 7,
        desc: 'Day Off',
        'name-1': '4',
        'name-2': '4',
        'name-3': '4',
        'name-4': '4',
        'name-5': '4',
        total: '20',
      },
      {
        key: 8,
        desc: 'Holiday',
        'name-1': '3',
        'name-2': '3',
        'name-3': '3',
        'name-4': '3',
        'name-5': '3',
        total: '15',
      },
      {
        key: 9,
        desc: 'Sick Day',
        'name-1': '1',
        'name-2': '1',
        'name-3': '1',
        'name-4': '1',
        'name-5': '1',
        total: '5',
      },
    ],
  },
  {
    key: 10,
    desc: 'PERFORMANCE',
    type: 'header',
    header_num: 2,
  },
  {
    key: 11,
    desc: 'Services',
    'name-1': {
      value: '£100,000.00',
      badge: 'error',
    },
    'name-2': {
      value: '£100,000.00',
      badge: 'error',
    },
    'name-3': {
      value: '£100,000.00',
      badge: 'error',
    },
    'name-4': {
      value: '£100,000.00',
      badge: 'error',
    },
    'name-5': {
      value: '£100,000.00',
      badge: 'error',
    },
    total: {
      value: '£500,000.00',
      badge: 'error',
    },
    children: [
      {
        key: 12,
        desc: 'Injectables',
        'name-1': {
          value: '£50,000.00',
          badge: 'success',
        },
        'name-2': {
          value: '£50,000.00',
          badge: 'success',
        },
        'name-3': {
          value: '£50,000.00',
          badge: 'success',
        },
        'name-4': {
          value: '£50,000.00',
          badge: 'success',
        },
        'name-5': {
          value: '£50,000.00',
          badge: 'success',
        },
        total: {
          value: '£250,000.00',
          badge: 'success',
        },
      },
      {
        key: 13,
        desc: 'Consultations',
        'name-1': {
          value: '£50,000.00',
          badge: 'success',
        },
        'name-2': {
          value: '£50,000.00',
          badge: 'success',
        },
        'name-3': {
          value: '£50,000.00',
          badge: 'success',
        },
        'name-4': {
          value: '£50,000.00',
          badge: 'success',
        },
        'name-5': {
          value: '£50,000.00',
          badge: 'success',
        },
        total: {
          value: '£250,000.00',
          badge: 'success',
        },
      },
      {
        key: 14,
        desc: 'Laser',
        'name-1': {
          value: '£50,000.00',
          badge: 'success',
        },
        'name-2': {
          value: '£50,000.00',
          badge: 'success',
        },
        'name-3': {
          value: '£50,000.00',
          badge: 'success',
        },
        'name-4': {
          value: '£50,000.00',
          badge: 'success',
        },
        'name-5': {
          value: '£50,000.00',
          badge: 'success',
        },
        total: {
          value: '£250,000.00',
          badge: 'success',
        },
        children: [
          {
            key: 15,
            desc: 'LHR - Back',
            'name-1': '£3,500.00',
            'name-2': '£3,500.00',
            'name-3': '£3,500.00',
            'name-4': '£3,500.00',
            'name-5': '£3,500.00',
            total: '17,500.00',
          },
          {
            key: 16,
            desc: 'LHR - Front',
            'name-1': '£3,500.00',
            'name-2': '£3,500.00',
            'name-3': '£3,500.00',
            'name-4': '£3,500.00',
            'name-5': '£3,500.00',
            total: '17,500.00',
          },
          {
            key: 17,
            desc: 'LHR - Small',
            'name-1': '£3,500.00',
            'name-2': '£3,500.00',
            'name-3': '£3,500.00',
            'name-4': '£3,500.00',
            'name-5': '£3,500.00',
            total: '17,500.00',
          },
          {
            key: 18,
            desc: 'LHR - Large',
            'name-1': '£3,500.00',
            'name-2': '£3,500.00',
            'name-3': '£3,500.00',
            'name-4': '£3,500.00',
            'name-5': '£3,500.00',
            total: '17,500.00',
          },
          {
            key: 19,
            desc: 'LHR - XL',
            'name-1': '£3,500.00',
            'name-2': '£3,500.00',
            'name-3': '£3,500.00',
            'name-4': '£3,500.00',
            'name-5': '£3,500.00',
            total: '17,500.00',
          },
        ],
      },
    ],
  },
  {
    key: 20,
    desc: 'Products',
    'name-1': {
      value: '£3,500.00',
      badge: 'error',
    },
    'name-2': {
      value: '£3,500.00',
      badge: 'error',
    },
    'name-3': {
      value: '£3,500.00',
      badge: 'error',
    },
    'name-4': {
      value: '£3,500.00',
      badge: 'error',
    },
    'name-5': {
      value: '£3,500.00',
      badge: 'error',
    },
    total: {
      value: '£17,500.00',
      badge: 'error',
    },
  },
  {
    key: 21,
    desc: 'Packages',
    'name-1': {
      value: '£3,500.00',
      badge: 'success',
    },
    'name-2': {
      value: '£3,500.00',
      badge: 'success',
    },
    'name-3': {
      value: '£3,500.00',
      badge: 'success',
    },
    'name-4': {
      value: '£3,500.00',
      badge: 'success',
    },
    'name-5': {
      value: '£3,500.00',
      badge: 'success',
    },
    total: {
      value: '£17,500.00',
      badge: 'success',
    },
  },
  {
    key: 22,
    desc: 'Vouchers',
    'name-1': {
      value: '£3,500.00',
      badge: 'success',
    },
    'name-2': {
      value: '£3,500.00',
      badge: 'success',
    },
    'name-3': {
      value: '£3,500.00',
      badge: 'success',
    },
    'name-4': {
      value: '£3,500.00',
      badge: 'success',
    },
    'name-5': {
      value: '£3,500.00',
      badge: 'success',
    },
    total: {
      value: '£17,500.00',
      badge: 'success',
    },
  },
  {
    key: 23,
    desc: 'KPIS',
    type: 'header',
    header_num: 3,
  },
  {
    key: 24,
    desc: 'Services',
    'name-1': {
      value: '56',
      badge: 'error',
    },
    'name-2': {
      value: '45',
      badge: 'error',
    },
    'name-3': {
      value: '34',
      badge: 'error',
    },
    'name-4': {
      value: '57',
      badge: 'error',
    },
    'name-5': {
      value: '76',
      badge: 'error',
    },
    total: {
      value: '268',
      badge: 'error',
    },
  },
  {
    key: 25,
    desc: 'Products',
    'name-1': {
      value: '5',
      badge: 'success',
    },
    'name-2': {
      value: '3',
      badge: 'success',
    },
    'name-3': {
      value: '10',
      badge: 'success',
    },
    'name-4': {
      value: '3',
      badge: 'success',
    },
    'name-5': {
      value: '23',
      badge: 'success',
    },
    total: {
      value: '44',
      badge: 'success',
    },

    children: [
      {
        key: 26,
        desc: 'Skin Creams',
        'name-1': {
          value: '4',
          badge: 'success',
        },
        'name-2': {
          value: '4',
          badge: 'success',
        },
        'name-3': {
          value: '5',
          badge: 'success',
        },
        'name-4': {
          value: '3',
          badge: 'success',
        },
        'name-5': {
          value: '4',
          badge: 'success',
        },
        total: {
          value: '20',
          badge: 'success',
        },
      },
      {
        key: 27,
        desc: 'Face Wash',
        'name-1': {
          value: '4',
          badge: 'success',
        },
        'name-2': {
          value: '5',
          badge: 'success',
        },
        'name-3': {
          value: '4',
          badge: 'success',
        },
        'name-4': {
          value: '5',
          badge: 'success',
        },
        'name-5': {
          value: '3',
          badge: 'success',
        },
        total: {
          value: '21',
          badge: 'success',
        },
      },
      {
        key: 28,
        desc: 'Lipstic',
        'name-1': {
          value: '5',
          badge: 'success',
        },
        'name-2': {
          value: '7',
          badge: 'success',
        },
        'name-3': {
          value: '6',
          badge: 'success',
        },
        'name-4': {
          value: '4',
          badge: 'success',
        },
        'name-5': {
          value: '4',
          badge: 'success',
        },
        total: {
          value: '26',
          badge: 'success',
        },
        children: [
          {
            key: 29,
            desc: 'LHR - Back',
            'name-1': '3',
            'name-2': '4',
            'name-3': '4',
            'name-4': '4',
            'name-5': '3',
            total: '18',
          },
          {
            key: 30,
            desc: 'LHR - Front',
            'name-1': '5',
            'name-2': '5',
            'name-3': '5',
            'name-4': '5',
            'name-5': '5',
            total: '25',
          },
          {
            key: 31,
            desc: 'LHR - Small',
            'name-1': '4',
            'name-2': '4',
            'name-3': '4',
            'name-4': '4',
            'name-5': '4',
            total: '20',
          },
          {
            key: 32,
            desc: 'LHR - Large',
            'name-1': '6',
            'name-2': '7',
            'name-3': '7',
            'name-4': '7',
            'name-5': '7',
            total: '34',
          },
          {
            key: 33,
            desc: 'LHR - XL',
            'name-1': '5',
            'name-2': '5',
            'name-3': '5',
            'name-4': '5',
            'name-5': '5',
            total: '25',
          },
        ],
      },
    ],
  },
  {
    key: 34,
    desc: 'Packages',
    'name-1': {
      value: '34',
      badge: 'success',
    },
    'name-2': {
      value: '45',
      badge: 'success',
    },
    'name-3': {
      value: '5',
      badge: 'success',
    },
    'name-4': {
      value: '6',
      badge: 'success',
    },
    'name-5': {
      value: '5',
      badge: 'success',
    },
    total: {
      value: '95',
      badge: 'success',
    },
  },
  {
    key: 35,
    desc: 'Vouchers',
    'name-1': {
      value: '5',
      badge: 'success',
    },
    'name-2': {
      value: '5',
      badge: 'success',
    },
    'name-3': {
      value: '5',
      badge: 'success',
    },
    'name-4': {
      value: '5',
      badge: 'success',
    },
    'name-5': {
      value: '5',
      badge: 'success',
    },
    total: {
      value: '25',
      badge: 'success',
    },
    children: [
      {
        key: 36,
        desc: 'Review Voucher',
        'name-1': '6',
        'name-2': '45',
        'name-3': '5',
        'name-4': '6',
        'name-5': '7',
        total: '69',
      },
      {
        key: 37,
        desc: 'Face Wash',
        'name-1': '8',
        'name-2': '8',
        'name-3': '8',
        'name-4': '8',
        'name-5': '8',
        total: '40',
      },
      {
        key: 38,
        desc: 'Lipstic',
        'name-1': '31',
        'name-2': '23',
        'name-3': '43',
        'name-4': '61',
        'name-5': '12',
        total: '170',
      },
    ],
  },
  {
    key: 39,
    desc: 'Avg Bill(per visit)',
    'name-1': {
      value: '£100,000.00',
      badge: 'success',
    },
    'name-2': {
      value: '£100,000.00',
      badge: 'success',
    },
    'name-3': {
      value: '£100,000.00',
      badge: 'success',
    },
    'name-4': {
      value: '£100,000.00',
      badge: 'success',
    },
    'name-5': {
      value: '£100,000.00',
      badge: 'success',
    },
    total: {
      value: '£500,000.00',
      badge: 'success',
    },
  },
  {
    key: 40,
    desc: 'Client Visits',
    'name-1': {
      value: '66',
      badge: 'error',
    },
    'name-2': {
      value: '32',
      badge: 'error',
    },
    'name-3': {
      value: '40',
      badge: 'error',
    },
    'name-4': {
      value: '22',
      badge: 'error',
    },
    'name-5': {
      value: '18',
      badge: 'error',
    },
    total: {
      value: '178',
      badge: 'error',
    },
    children: [
      {
        key: 41,
        desc: 'New Clients',
        'name-1': '4',
        'name-2': '4',
        'name-3': '4',
        'name-4': '4',
        'name-5': '4',
        total: '20',
      },
      {
        key: 42,
        desc: 'Existing Clients',
        'name-1': '3',
        'name-2': '3',
        'name-3': '3',
        'name-4': '3',
        'name-5': '3',
        total: '15',
      },
      {
        key: 43,
        desc: 'Walkin',
        'name-1': '1',
        'name-2': '1',
        'name-3': '1',
        'name-4': '1',
        'name-5': '1',
        total: '5',
      },
    ],
  },
  {
    key: 44,
    desc: 'Rebook',
    'name-1': {
      value: '34',
      badge: 'error',
    },
    'name-2': {
      value: '56',
      badge: 'error',
    },
    'name-3': {
      value: '55',
      badge: 'error',
    },
    'name-4': {
      value: '78',
      badge: 'error',
    },
    'name-5': {
      value: '35',
      badge: 'error',
    },
    total: {
      value: '258',
      badge: 'error',
    },
  },
  {
    key: 45,
    desc: 'Utilisation',
    'name-1': {
      value: '19',
      badge: 'success',
    },
    'name-2': {
      value: '15',
      badge: 'success',
    },
    'name-3': {
      value: '14',
      badge: 'success',
    },
    'name-4': {
      value: '13',
      badge: 'success',
    },
    'name-5': {
      value: '15',
      badge: 'success',
    },
    total: {
      value: '76',
      badge: 'success',
    },
  },
  {
    key: 46,
    desc: 'Review Score',
    'name-1': {
      value: '5',
      badge: 'success',
    },
    'name-2': {
      value: '5',
      badge: 'success',
    },
    'name-3': {
      value: '5',
      badge: 'success',
    },
    'name-4': {
      value: '5',
      badge: 'success',
    },
    'name-5': {
      value: '5',
      badge: 'success',
    },
    total: {
      value: '25',
      badge: 'success',
    },
    children: [
      {
        key: 47,
        desc: '5* Review',
        'name-1': '4',
        'name-2': '4',
        'name-3': '4',
        'name-4': '4',
        'name-5': '4',
        total: '20',
      },
      {
        key: 48,
        desc: '4* Review',
        'name-1': '3',
        'name-2': '3',
        'name-3': '3',
        'name-4': '3',
        'name-5': '3',
        total: '15',
      },
      {
        key: 49,
        desc: '3* Review',
        'name-1': '1',
        'name-2': '1',
        'name-3': '1',
        'name-4': '1',
        'name-5': '1',
        total: '5',
      },
      {
        key: 48,
        desc: '4* Review',
        'name-1': '3',
        'name-2': '3',
        'name-3': '3',
        'name-4': '3',
        'name-5': '3',
        total: '15',
      },
      {
        key: 49,
        desc: '3* Review',
        'name-1': '1',
        'name-2': '1',
        'name-3': '1',
        'name-4': '1',
        'name-5': '1',
        total: '5',
      },
      {
        key: 50,
        desc: '2* Review',
        'name-1': '3',
        'name-2': '3',
        'name-3': '3',
        'name-4': '3',
        'name-5': '3',
        total: '15',
      },
      {
        key: 51,
        desc: '1* Review',
        'name-1': '1',
        'name-2': '1',
        'name-3': '1',
        'name-4': '1',
        'name-5': '1',
        total: '5',
      },
    ],
  },
  {
    key: 52,
    desc: 'Core Factor',
    'name-1': {
      value: '45',
      badge: 'error',
    },
    'name-2': {
      value: '16',
      badge: 'error',
    },
    'name-3': {
      value: '49',
      badge: 'error',
    },
    'name-4': {
      value: '29',
      badge: 'error',
    },
    'name-5': {
      value: '83',
      badge: 'error',
    },
    total: {
      value: '222',
      badge: 'error',
    },
  },
]
export const columns = [
  {
    title: '',
    dataIndex: 'desc',
    key: 'desc',
    fixed: 'left',
    align: 'left',
  },
  {
    title: 'William Brandham',
    dataIndex: 'name-1',
    key: 'name-1',
    align: 'right',
  },
  {
    title: 'Kate Pipson',
    dataIndex: 'name-2',
    key: 'name-2',
    align: 'right',
  },
  {
    title: 'William Brandham',
    dataIndex: 'name-3',
    key: 'name-3',
    align: 'right',
  },
  {
    title: 'Kate Pipson',
    dataIndex: 'name-4',
    key: 'name-4',
    align: 'right',
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
    align: 'right',
  },
]
