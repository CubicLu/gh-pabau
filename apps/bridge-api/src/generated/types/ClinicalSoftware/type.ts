import { objectType } from 'nexus'

export const ClinicalSoftware = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ClinicalSoftware',
  definition(t) {
    t.int('id')
    t.string('name')
    t.int('difficulty')
    t.int('frequency')
  },
})
