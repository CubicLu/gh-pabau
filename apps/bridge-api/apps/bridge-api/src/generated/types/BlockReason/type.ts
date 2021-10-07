import { objectType } from 'nexus'

export const BlockReason = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'BlockReason',
  definition(t) {
    t.int('id')
    t.string('reason_name')
    t.int('company_id')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.boolean('is_active')
    t.string('block_color')
    t.int('is_paid')
    t.nullable.string('default_time')
    t.int('type')
    t.int('custom_id')
  },
})
