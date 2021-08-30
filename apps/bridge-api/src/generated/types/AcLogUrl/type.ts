import { objectType } from 'nexus'

export const AcLogUrl = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'AcLogUrl',
  definition(t) {
    t.int('id')
    t.string('url')
    t.string('file')
    t.string('referer')
  },
})
