import { objectType } from 'nexus'

export const BookingStatusChange = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'BookingStatusChange',
  definition(t) {
    t.int('id')
    t.int('booking_id')
    t.string('status')
    t.field('start_date', { type: 'DateTime' })
    t.nullable.field('end_date', { type: 'DateTime' })
    t.int('company_id')
    t.int('user_id')
  },
})
