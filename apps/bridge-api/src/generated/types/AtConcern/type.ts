import { objectType } from 'nexus'

export const AtConcern = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'AtConcern',
  definition(t) {
    t.int('id')
    t.string('name')
    t.string('image')
    t.string('region')
  },
})
