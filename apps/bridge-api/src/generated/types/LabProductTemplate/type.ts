import { objectType } from 'nexus'

export const LabProductTemplate = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'LabProductTemplate',
  definition(t) {
    t.int('id')
    t.string('test_name')
    t.string('code')
    t.string('sample_reqs')
    t.string('tat')
  },
})
