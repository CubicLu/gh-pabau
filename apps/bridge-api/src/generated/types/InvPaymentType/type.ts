import { objectType } from 'nexus'

export const InvPaymentType = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'InvPaymentType',
  definition(t) {
    t.int('id')
    t.nullable.string('name')
    t.nullable.int('epos_display')
    t.nullable.string('description')
    t.nullable.int('company_id')
    t.nullable.int('uid')
    t.nullable.field('created_date', { type: 'DateTime' })
    t.nullable.field('modified_date', { type: 'DateTime' })
    t.int('is_active')
    t.nullable.int('is_money')
    t.string('type')
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.nullable.field('GlCode', {
      type: 'GlCode',
      resolve(root: any) {
        return root.GlCode
      },
    })
  },
})
