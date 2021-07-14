import { objectType } from 'nexus'

export const JobOpening = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'JobOpening',
  definition(t) {
    t.int('openingid')
    t.string('opening_title')
    t.string('hiring_manager')
    t.string('start_date')
    t.string('end_date')
    t.string('status')
    t.int('published')
    t.int('company_id')
    t.string('description')
    t.int('attached_forms')
    t.string('created_date')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})
