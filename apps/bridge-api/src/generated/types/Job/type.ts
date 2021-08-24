import { objectType } from 'nexus'

export const Job = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Job',
  definition(t) {
    t.int('job_id')
    t.field('create_date', { type: 'DateTime' })
    t.int('created_by_id')
    t.field('start_date', { type: 'DateTime' })
    t.field('closing_date', { type: 'DateTime' })
    t.string('opening_title')
    t.string('job_location')
    t.string('what_you_do')
    t.boolean('is_closed')
    t.string('department')
    t.string('job_country')
    t.string('opening_job_blurb')
    t.string('employment_type')
    t.int('company_id')
    t.string('experience')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})
