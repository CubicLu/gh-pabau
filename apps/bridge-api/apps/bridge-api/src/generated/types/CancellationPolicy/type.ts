import { objectType } from 'nexus'

export const CancellationPolicy = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CancellationPolicy',
  definition(t) {
    t.int('id')
    t.boolean('is_active')
    t.int('policy_type')
    t.int('policy_action')
    t.float('policy_value')
    t.string('policy_notice')
    t.nullable.string('policy_message')
    t.int('policy_override')
    t.int('payment_protection')
    t.int('advanced_cancellation_fee')
    t.int('no_show_fee')
    t.int('company_id')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.nullable.field('creation_date', { type: 'DateTime' })
    t.nullable.field('modified_date', { type: 'DateTime' })
  },
})
