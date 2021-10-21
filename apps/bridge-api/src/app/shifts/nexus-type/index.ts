import { objectType } from 'nexus'

export const PublicShiftResponse = objectType({
  name: 'Public_Shift',
  definition(t) {
    t.int('id')
    t.int('uid')
    t.float('start')
    t.float('end')
    t.int('room_id')
    t.int('location_id')
  },
})
