import { objectType } from 'nexus'

export const InvWarehouse = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'InvWarehouse',
  definition(t) {
    t.int('id')
    t.string('code')
    t.string('name')
    t.string('address')
    t.string('city')
    t.nullable.int('company_id')
    t.nullable.int('uid')
    t.nullable.field('created_date', { type: 'DateTime' })
    t.nullable.field('modified_date', { type: 'DateTime' })
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})
