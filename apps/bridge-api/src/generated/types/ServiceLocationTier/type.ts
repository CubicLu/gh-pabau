import { objectType } from 'nexus'

export const ServiceLocationTier = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ServiceLocationTier',
  definition(t) {
    t.int('id')
    t.int('location_id')
    t.int('service_id')
    t.float('price')
    t.nullable.field('CompanyService', {
      type: 'CompanyService',
      resolve(root: any) {
        return root.CompanyService
      },
    })
    t.nullable.field('Location', {
      type: 'CompanyBranch',
      resolve(root: any) {
        return root.Location
      },
    })
  },
})
