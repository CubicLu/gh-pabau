import { objectType } from 'nexus'

export const InventoryMovement = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'InventoryMovement',
  definition(t) {
    t.int('id')
    t.nullable.int('company_id')
    t.nullable.int('location_id')
    t.nullable.int('date')
    t.string('type')
    t.int('quantity')
    t.int('new_quantity')
    t.nullable.int('entered_by')
    t.nullable.int('product_id')
    t.string('description')
    t.int('room_id')
    t.int('sale_item_id')
    t.nullable.int('contact_id')
    t.nullable.field('Contact', {
      type: 'CmContact',
      resolve(root: any) {
        return root.Contact
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
    t.nullable.field('Product', {
      type: 'InvProduct',
      resolve(root: any) {
        return root.Product
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
