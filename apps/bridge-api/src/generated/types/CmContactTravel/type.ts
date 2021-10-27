import { objectType } from 'nexus'

export const CmContactTravel = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CmContactTravel',
  definition(t) {
    t.int('id')
    t.int('contact_id')
    t.int('country_id')
    t.field('start_date', { type: 'DateTime' })
    t.field('end_date', { type: 'DateTime' })
    t.int('company_id')
    t.string('duration')
    t.int('mode')
    t.int('uid')
    t.int('medical_record_id')
    t.field('creation_date', { type: 'DateTime' })
    t.field('modified_date', { type: 'DateTime' })
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.field('CmContact', {
      type: 'CmContact',
      resolve(root: any) {
        return root.CmContact
      },
    })
    t.field('Country', {
      type: 'Country',
      resolve(root: any) {
        return root.Country
      },
    })
    t.field('User', {
      type: 'User',
      resolve(root: any) {
        return root.User
      },
    })
  },
})
