import { objectType } from 'nexus'

export const AppPermission = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'AppPermission',
  definition(t) {
    t.int('id')
    t.int('company')
    t.string('appid')
  },
})
