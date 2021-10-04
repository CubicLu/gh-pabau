import { objectType } from 'nexus'

export const PublicBookingResponse = objectType({
  name: 'Public_Booking',
  definition(t) {
    t.int('id')
    t.float('start_date')
    t.float('end_date')
    t.int('UID')
    t.int('all_day')
    t.int('location_id')
  },
})
