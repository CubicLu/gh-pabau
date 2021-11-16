import { objectType } from 'nexus'

export const LabRequestTests = objectType({
  name: 'LabRequestTests',
  definition(t) {
    t.int('id')
    t.string('test_name')
    t.string('code')
    t.string('sample_reqs')
    t.string('tat')
    t.boolean('abnormal')
  },
})
