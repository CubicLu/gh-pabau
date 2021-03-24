import { TeamReportServiceGroup } from '@pabau/ui'

export const serviceGroups: TeamReportServiceGroup[] = [
  {
    name: 'Payroll',
    prefix: '£',
    services: [
      { name: 'Team Commision', prefix: '£' },
      { name: 'Team Wages', prefix: '£' },
    ],
  },
  {
    name: 'Shifts',
    services: [
      { name: 'Days Worked' },
      {
        name: 'Days Off',
        services: [
          { name: 'Day Off' },
          { name: 'Holiday' },
          { name: 'Sick Day' },
        ],
      },
    ],
  },
  {
    name: 'Performance',
    prefix: '£',
    services: [
      {
        name: 'Services',
        services: [
          { name: 'Injectables', prefix: '£' },
          { name: 'Consultations', prefix: '£' },
          {
            name: 'Laser',
            prefix: '£',
            services: [
              { name: 'LHR - Back', prefix: '£' },
              { name: 'LHR - Front', prefix: '£' },
              { name: 'LHR - Small', prefix: '£' },
              { name: 'LHR - Large', prefix: '£' },
              { name: 'LHR - XL', prefix: '£' },
            ],
          },
        ],
      },
      {
        name: 'Products',
        prefix: '£',
        services: [
          {
            name: 'Skin Creams',
            prefix: '£',
          },
          {
            name: 'Face Wash',
            prefix: '£',
          },
          {
            name: 'Lipstic',
            prefix: '£',
            services: [
              { name: 'LHR - Back', prefix: '£' },
              { name: 'LHR - Front ', prefix: '£' },
              { name: 'LHR - Small', prefix: '£' },
              { name: 'LHR - Large', prefix: '£' },
              { name: 'LHR - XL', prefix: '£' },
            ],
          },
        ],
      },
      { name: 'Packages', prefix: '£' },
      {
        name: 'Vouchers',
        prefix: '£',
        services: [
          {
            name: 'Review Voucher',
            prefix: '£',
          },
          {
            name: 'Face Wash',
            prefix: '£',
          },
          {
            name: 'Lipstic',
            prefix: '£',
          },
        ],
      },
    ],
  },
  {
    name: 'Kpis',
    services: [
      {
        name: 'Services',
        services: [
          { name: 'Injectables' },
          { name: 'Consultations' },
          {
            name: 'Laser',
            services: [
              { name: 'LHR - Back' },
              { name: 'LHR - Front ' },
              { name: 'LHR - Small' },
              { name: 'LHR - Large' },
              { name: 'LHR - XL' },
            ],
          },
        ],
      },
      {
        name: 'Products',
        services: [
          {
            name: 'Skin Creams',
          },
          {
            name: 'Face Wash',
          },
          {
            name: 'Lipstic',
            services: [
              { name: 'LHR - Back' },
              { name: 'LHR - Front ' },
              { name: 'LHR - Small' },
              { name: 'LHR - Large' },
              { name: 'LHR - XL' },
            ],
          },
        ],
      },
      { name: 'Packages' },
      {
        name: 'Vouchers',
        services: [
          {
            name: 'Review Voucher',
          },
          {
            name: 'Face Wash',
          },
          {
            name: 'Lipstic',
          },
        ],
      },
      { name: 'Avg Bill (per visit)', prefix: '£' },
      {
        name: 'Client Visits',
        services: [
          {
            name: 'New Clients',
          },
          {
            name: 'Existing Clients',
          },
          {
            name: 'Walkin',
          },
        ],
      },
      { name: 'Rebook', suffix: '%' },
      { name: 'Utilisation', suffix: '%' },
      {
        name: 'Review score',
        services: [
          { name: '5* Review' },
          { name: '4* Review' },
          { name: '3* Review' },
          { name: '2* Review' },
          { name: '1* Review' },
        ],
      },
      { name: 'Care Factor' },
    ],
  },
]
