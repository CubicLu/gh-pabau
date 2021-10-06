import { objectType } from 'nexus'

export const Package = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Package',
  definition(t) {
    t.int('id')
    t.string('name')
    t.nullable.string('description')
    t.string('session_count')
    t.string('duration')
    t.float('price')
    t.string('activities')
    t.nullable.int('company_id')
    t.field('CreatedDate', { type: 'DateTime' })
    t.int('imported')
    t.boolean('inactive')
    t.int('deleted')
    t.int('product_id')
    t.int('service_product_id')
    t.int('hard_deleted')
    t.int('session_package_master_id')
    t.int('tax_id')
    t.string('custom_service_name')
    t.float('custom_price_item')
    t.int('empty_name')
    t.float('old_price')
    t.string('old_duration')
    t.string('disabledusers')
    t.int('sold_online')
    t.nullable.field('contact_packages', {
      type: 'ContactPackage',
      resolve(root: any) {
        return root.contact_packages
      },
    })
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.nullable.field('ServiceProduct', {
      type: 'InvProduct',
      resolve(root: any) {
        return root.ServiceProduct
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
