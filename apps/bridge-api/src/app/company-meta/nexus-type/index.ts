import { objectType } from 'nexus'

export const UpdateCompanyMetaResponse = objectType({
  name: 'CreateCompanyMetaResponse',
  definition(t) {
    t.string('meta_name')
    t.string('meta_value')
  },
})
