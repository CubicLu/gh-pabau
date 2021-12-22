import { objectType } from 'nexus'

export const ConnectRegistrationField = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ConnectRegistrationField',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.string('fields_data')
  },
})
