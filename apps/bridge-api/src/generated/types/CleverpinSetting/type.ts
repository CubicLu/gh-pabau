import { objectType } from 'nexus'

export const CleverpinSetting = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CleverpinSetting',
  definition(t) {
    t.int('id')
    t.string('image_url')
    t.int('company_id')
  },
})
