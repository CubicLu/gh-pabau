import { objectType } from 'nexus'

export const AtQuestionsRelation = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'AtQuestionsRelation',
  definition(t) {
    t.int('company_id')
    t.int('answer_id')
    t.int('product_id')
  },
})
