import { objectType } from 'nexus'
export const PublicMasterCategoryResponse = objectType({
  name: 'PublicMasterCategoryResponse',
  definition(t) {
    t.id('id')
    t.int('company_id')
    t.string('image')
    t.string('name')
    t.string('type')
    t.field('Public_Services', { type: PublicServiceResponse })
  },
})

export const PublicServiceCategoryResponse = objectType({
  name: 'PublicServiceCategoryResponse',
  definition(t) {
    t.id('id')
    t.int('company_id')
    t.string('service')
    t.string('duration')
    t.string('description')
    t.float('price')
  },
})

export const PublicServiceResponse = objectType({
  name: 'PublicServiceResponse',
  definition(t) {
    t.id('id')
    t.string('name')
    t.int('company_id')
  },
})
