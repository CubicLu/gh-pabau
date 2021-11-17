import { objectType } from 'nexus'

export const SmsSender = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'SmsSender',
  definition(t) {
    t.int('smsd_id')
    t.string('smsd_name')
    t.int('company_id')
    t.int('smsd_delete')
    t.boolean('is_default')
    t.string('merge_tags')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})
