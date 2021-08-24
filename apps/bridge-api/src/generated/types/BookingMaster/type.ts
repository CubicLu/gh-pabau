import { objectType } from 'nexus'

export const BookingMaster = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'BookingMaster',
  definition(t) {
    t.int('id')
    t.string('class_id')
    t.string('user_id')
    t.nullable.string('booking_date')
    t.field('payment_status', { type: 'booking_master_payment_status' })
    t.field('cancel_status', { type: 'booking_master_cancel_status' })
    t.string('cancel_date')
    t.string('company_id')
    t.nullable.string('class_currency')
    t.nullable.string('class_price')
    t.int('checked_in')
    t.string('payed_by')
    t.int('waiting')
  },
})
