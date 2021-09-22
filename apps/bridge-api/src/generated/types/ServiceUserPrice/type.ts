import { objectType } from 'nexus'

export const ServiceUserPrice = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ServiceUserPrice',
  definition(t) {
    t.int('id')
    t.int('service_id')
    t.int('user_id')
    t.int('company_id')
    t.nullable.float('price')
    t.string('duration')
    t.nullable.float('staff_commission')
    t.nullable.float('participant_commission')
    t.field('CompanyService', {
      type: 'CompanyService',
      resolve(root: any) {
        return root.CompanyService
      },
    })
  },
})
