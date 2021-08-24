import { objectType } from 'nexus'

export const CmBookingNote = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CmBookingNote',
  definition(t) {
    t.int('ID')
    t.int('OwnerID')
    t.int('AppointmentID')
    t.string('Note')
    t.field('Status', { type: 'cm_booking_notes_Status' })
    t.field('CreatedDate', { type: 'DateTime' })
    t.int('IpAddress')
  },
})
