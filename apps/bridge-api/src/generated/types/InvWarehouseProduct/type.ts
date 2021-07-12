import { objectType } from 'nexus'

export const InvWarehouseProduct = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'InvWarehouseProduct',
  definition(t) {
    t.int('id')
    t.nullable.int('product_id')
    t.nullable.int('warehouse_id')
    t.nullable.int('location_id')
    t.int('quantity')
    t.nullable.int('company_id')
    t.nullable.int('user_id')
    t.nullable.field('created_date', { type: 'DateTime' })
    t.nullable.field('modified_date', { type: 'DateTime' })
    t.nullable.field('expiry_date', { type: 'DateTime' })
    t.nullable.string('batch_code')
    t.string('description')
    t.nullable.field('Product', {
      type: 'InvProduct',
      resolve(root: any) {
        return root.Product
      },
    })
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.nullable.field('Location', {
      type: 'CompanyBranch',
      resolve(root: any) {
        return root.Location
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
