import { objectType } from 'nexus'

export const AppBeforeAfter = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'AppBeforeAfter',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.int('contact_id')
    t.string('before_img')
    t.string('after_img')
    t.string('pass_key')
  },
})
