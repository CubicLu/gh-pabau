import { objectType } from 'nexus'

export const AtAnswer = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'AtAnswer',
  definition(t) {
    t.int('id')
    t.int('question_id')
    t.string('name')
    t.string('image')
  },
})
