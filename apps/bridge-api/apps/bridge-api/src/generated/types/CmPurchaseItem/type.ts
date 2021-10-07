import { objectType } from 'nexus'

export const CmPurchaseItem = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CmPurchaseItem',
  definition(t) {
    t.int('id')
    t.nullable.int('order_id')
    t.nullable.int('product_id')
    t.int('quantity')
    t.nullable.float('cost_price')
    t.int('amount_received')
    t.nullable.field('Order', {
      type: 'CmPurchaseOrder',
      resolve(root: any) {
        return root.Order
      },
    })
    t.nullable.field('Product', {
      type: 'InvProduct',
      resolve(root: any) {
        return root.Product
      },
    })
  },
})
