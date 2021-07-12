import { objectType } from 'nexus'

export const SmsPurchase = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'SmsPurchase',
  definition(t) {
    t.int('id')
    t.int('date')
    t.int('sms_amount')
    t.int('company_id')
    t.nullable.int('user_id')
    t.float('price')
    t.float('profit')
    t.string('purchase_type')
    t.int('status')
    t.field('Company', {
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
