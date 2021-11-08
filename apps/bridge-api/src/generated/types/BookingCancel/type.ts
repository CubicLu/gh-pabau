import { objectType } from 'nexus'

export const BookingCancel = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'BookingCancel',
  definition(t) {
    t.int('id')
    t.int('appointment_id')
    t.nullable.string('type')
    t.nullable.string('reason_type')
    t.nullable.string('reason')
    t.nullable.field('created_date', { type: 'DateTime' })
    t.nullable.field('last_updated_date', { type: 'DateTime' })
    t.int('cancel_by')
    t.int('cancel_reason_id')
    t.field('Booking', {
      type: 'Booking',
      resolve(root: any) {
        return root.Booking
      },
    })
    t.field('CancelReason', {
      type: 'CancelReason',
      resolve(root: any) {
        return root.CancelReason
      },
    })
    t.field('User', {
      type: 'User',
      resolve(root: any) {
        return root.User
      },
    })
  },
})
