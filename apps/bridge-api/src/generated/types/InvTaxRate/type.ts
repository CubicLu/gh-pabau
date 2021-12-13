import { objectType } from 'nexus'

export const InvTaxRate = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'InvTaxRate',
  definition(t) {
    t.int('id')
    t.string('name')
    t.float('rate')
    t.string('type')
    t.nullable.int('company_id')
    t.nullable.int('user_id')
    t.nullable.field('created_date', { type: 'DateTime' })
    t.nullable.field('modified_date', { type: 'DateTime' })
    t.int('is_active')
    t.nullable.string('description')
    t.boolean('date_constrained')
    t.int('start_date')
    t.int('end_date')
    t.int('show_on_receipt')
    t.int('custom_id')
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.nullable.field('User', {
      type: 'User',
      resolve(root: any) {
        return root.User
      },
    })
  },
})
