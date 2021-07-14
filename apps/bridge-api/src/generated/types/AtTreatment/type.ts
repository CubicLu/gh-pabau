import { objectType } from 'nexus'

export const AtTreatment = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'AtTreatment',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.string('name')
    t.string('image')
    t.string('description')
  },
})
