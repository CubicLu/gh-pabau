import { objectType } from 'nexus'

export const DiscountDisableUser = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'DiscountDisableUser',
  definition(t) {
    t.int('id')
    t.int('tax_id')
    t.int('user_id')
    t.nullable.field('Discount', {
      type: 'InvTaxRate',
      resolve(root: any) {
        return root.Discount
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
