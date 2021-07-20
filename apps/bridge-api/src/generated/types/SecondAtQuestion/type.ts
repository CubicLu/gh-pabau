import { objectType } from 'nexus'

export const SecondAtQuestion = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'SecondAtQuestion',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.string('name')
    t.string('type')
  },
})
