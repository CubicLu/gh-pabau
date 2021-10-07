import { objectType } from 'nexus'

export const AvilableDatesLog = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'AvilableDatesLog',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.int('uid')
    t.field('date', { type: 'DateTime' })
    t.field('start', { type: 'DateTime' })
    t.field('end', { type: 'DateTime' })
  },
})
