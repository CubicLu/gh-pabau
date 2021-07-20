import { objectType } from 'nexus'

export const BookingStatus = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'BookingStatus',
  definition(t) {
    t.int('id')
    t.string('name')
    t.string('value')
    t.nullable.string('icon')
    t.nullable.string('icon_color')
    t.nullable.int('company_id')
    t.nullable.field('indicator', { type: 'booking_statuses_indicator' })
    t.boolean('basic_field')
    t.nullable.float('ord')
    t.int('track_time')
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})
