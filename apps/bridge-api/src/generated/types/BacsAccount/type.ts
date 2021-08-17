import { objectType } from 'nexus'

export const BacsAccount = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'BacsAccount',
  definition(t) {
    t.int('id')
    t.string('bank_tag')
    t.int('comp_id')
    t.string('branch_name')
    t.string('account_holder')
    t.int('account_no')
    t.string('sort_code')
  },
})
