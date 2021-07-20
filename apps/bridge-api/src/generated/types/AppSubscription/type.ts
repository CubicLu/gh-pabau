import { objectType } from 'nexus'

export const AppSubscription = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'AppSubscription',
  definition(t) {
    t.int('id')
    t.string('key_value')
    t.string('name')
    t.string('Description')
    t.float('price')
  },
})
