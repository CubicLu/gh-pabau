import { objectType } from 'nexus'

export const JobConfiguration = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'JobConfiguration',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.string('about_us')
    t.string('color_scheme')
    t.string('opening_blurb')
    t.string('page_title')
    t.string('first_name')
    t.string('last_name')
    t.string('email')
    t.string('dob')
    t.string('phone')
    t.nullable.string('address')
    t.nullable.string('city')
    t.nullable.string('postal')
    t.string('country')
    t.nullable.string('cover_letter')
    t.nullable.string('resume')
    t.nullable.string('date_available')
    t.string('linkedin')
    t.string('reference')
    t.string('how_did_hear')
    t.string('who_referred')
    t.string('default_reply')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})
