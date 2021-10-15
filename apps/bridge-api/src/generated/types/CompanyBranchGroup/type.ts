import { objectType } from 'nexus'

export const CompanyBranchGroup = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CompanyBranchGroup',
  definition(t) {
    t.int('id')
    t.nullable.string('name')
    t.int('shared_data')
    t.int('company_id')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.list.field('CompanyBranch', {
      type: 'CompanyBranch',
      args: {
        where: 'CompanyBranchWhereInput',
        orderBy: 'CompanyBranchOrderByInput',
        cursor: 'CompanyBranchWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CompanyBranchScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CompanyBranch
      },
    })
  },
})
