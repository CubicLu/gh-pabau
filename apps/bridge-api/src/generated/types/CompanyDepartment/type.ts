import { objectType } from 'nexus'

export const CompanyDepartment = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CompanyDepartment',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.string('department')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})
