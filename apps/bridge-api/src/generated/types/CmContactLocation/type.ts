import { objectType } from 'nexus'

export const CmContactLocation = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CmContactLocation',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.int('contact_id')
    t.int('location_id')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.field('Location', {
      type: 'CompanyBranch',
      resolve(root: any) {
        return root.Location
      },
    })
    t.field('CmContact', {
      type: 'CmContact',
      resolve(root: any) {
        return root.CmContact
      },
    })
  },
})
