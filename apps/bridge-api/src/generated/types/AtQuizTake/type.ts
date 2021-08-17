import { objectType } from 'nexus'

export const AtQuizTake = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'AtQuizTake',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.string('name')
    t.string('email')
    t.field('take_date', { type: 'DateTime' })
    t.string('answers')
    t.string('concerns')
    t.string('answers2')
    t.string('products')
  },
})
