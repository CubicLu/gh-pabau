import { objectType } from 'nexus'

export const CheckinAppt = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CheckinAppt',
  definition(t) {
    t.int('id')
    t.int('appt_id')
    t.string('spotify_uri')
  },
})
