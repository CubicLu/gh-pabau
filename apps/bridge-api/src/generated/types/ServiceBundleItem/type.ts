import { objectType } from 'nexus'

export const ServiceBundleItem = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ServiceBundleItem',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.int('service_id')
    t.string('item_type')
    t.int('item_id')
    t.int('item_qty')
    t.field('Service', {
      type: 'CompanyService',
      resolve(root: any) {
        return root.Service
      },
    })
  },
})
