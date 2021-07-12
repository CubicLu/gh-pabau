import { objectType } from 'nexus'

export const CmAuthorization = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CmAuthorization',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.int('appointment_id')
    t.int('contact_id')
    t.string('title')
    t.int('total_sessions')
    t.string('diagnosis_code')
  },
})
