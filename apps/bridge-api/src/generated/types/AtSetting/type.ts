import { objectType } from 'nexus'

export const AtSetting = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'AtSetting',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.string('logo')
    t.string('background')
    t.string('font_family')
  },
})
