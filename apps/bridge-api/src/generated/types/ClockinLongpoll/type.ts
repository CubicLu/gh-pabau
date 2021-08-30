import { objectType } from 'nexus'

export const ClockinLongpoll = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ClockinLongpoll',
  definition(t) {
    t.int('id')
    t.boolean('clocked_out')
    t.int('uid')
    t.int('company_id')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})
