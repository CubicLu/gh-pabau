import { objectType } from 'nexus'

export const JobStatus = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'JobStatus',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.string('name')
    t.boolean('status')
    t.int('order')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})
