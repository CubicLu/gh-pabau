import { objectType } from 'nexus'

export const BookingChangeLog = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'BookingChangeLog',
  definition(t) {
    t.int('id')
    t.int('appointment_id')
    t.string('changelog')
    t.field('Booking', {
      type: 'Booking',
      resolve(root: any) {
        return root.Booking
      },
    })
  },
})
