import { objectType } from 'nexus'

export const ServiceUserTier = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ServiceUserTier',
  definition(t) {
    t.int('id')
    t.int('service_id')
    t.int('user_id')
    t.int('company_id')
    t.nullable.float('price')
    t.string('duration')
    t.nullable.float('staff_commission')
    t.nullable.float('participant_commission')
    t.nullable.field('User', {
      type: 'User',
      resolve(root: any) {
        return root.User
      },
    })
    t.nullable.field('CompanyService', {
      type: 'CompanyService',
      resolve(root: any) {
        return root.CompanyService
      },
    })
  },
})
