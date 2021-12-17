import { objectType } from 'nexus'

export const Currency = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Currency',
  definition(t) {
    t.int('ID')
    t.string('code')
    t.string('symbol')
    t.string('name')
    t.string('plural')
    t.int('decimaldigits')
    t.int('rounding')
    t.nullable.field('Country', {
      type: 'Country',
      resolve(root: any) {
        return root.Country
      },
    })
  },
})
