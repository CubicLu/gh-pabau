import { objectType } from 'nexus'

export const InventoryDiscrepancy = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'InventoryDiscrepancy',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.nullable.int('staff_id')
    t.nullable.int('product_id')
    t.float('overage')
    t.float('shortage')
    t.nullable.int('count_id')
    t.int('draft')
    t.int('counted')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.nullable.field('Staff', {
      type: 'CmStaffGeneral',
      resolve(root: any) {
        return root.Staff
      },
    })
    t.nullable.field('Count', {
      type: 'InventoryCount',
      resolve(root: any) {
        return root.Count
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
