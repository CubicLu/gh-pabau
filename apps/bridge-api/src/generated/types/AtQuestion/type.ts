import { objectType } from 'nexus'

export const AtQuestion = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'AtQuestion',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.string('name')
    t.int('order')
    t.string('region')
  },
})
