import { objectType } from 'nexus'

export const Candidate = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Candidate',
  definition(t) {
    t.int('id')
    t.int('contact_id')
    t.field('created_date', { type: 'DateTime' })
    t.int('opening_id')
    t.int('rating')
    t.nullable.string('candidate_status')
    t.string('job_references')
    t.string('how_heard')
    t.string('referred_by')
    t.string('cover_letter')
    t.string('resume')
    t.field('date_available', { type: 'DateTime' })
    t.string('linkedin')
    t.nullable.int('company_id')
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})
