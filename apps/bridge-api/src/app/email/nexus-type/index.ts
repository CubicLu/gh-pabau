import { objectType } from 'nexus'

export const EmailNexusOutput = objectType({
  name: 'EmailNexusOutput',
  definition(t) {
    t.boolean('success')
  },
})
