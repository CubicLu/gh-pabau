import { objectType } from 'nexus'

export const SecondAtAnswer = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'SecondAtAnswer',
  definition(t) {
    t.int('id')
    t.int('question_id')
    t.string('name')
  },
})
