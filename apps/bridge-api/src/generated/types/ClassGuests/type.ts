import { objectType } from 'nexus'

export const ClassGuests = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ClassGuests',
  definition(t) {
    t.int('id')
    t.string('guest_name')
    t.int('signing_date')
    t.int('class_id')
    t.int('company_id')
    t.int('cancel_status')
    t.string('mobile')
  },
})
