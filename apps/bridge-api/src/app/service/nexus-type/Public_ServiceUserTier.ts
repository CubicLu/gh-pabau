import { objectType } from 'nexus'

export const PublicServiceUserTierResponse = objectType({
  name: 'Public_ServiceUserTier',
  definition(t) {
    t.int('id')
    t.int('user_id')
    t.float('price')
    t.int('service_id')
    t.string('duration')
  },
})
