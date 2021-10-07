import { objectType } from 'nexus'

export const CmExtraGym = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CmExtraGym',
  definition(t) {
    t.int('id')
    t.int('contact_id')
    t.string('primary_goal')
    t.string('intro_class')
    t.string('age_group')
    t.int('occupier')
    t.string('skill_level')
    t.string('membership')
    t.field('CmContact', {
      type: 'CmContact',
      resolve(root: any) {
        return root.CmContact
      },
    })
  },
})
