import { objectType } from 'nexus'

export const CompanyPosition = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CompanyPosition',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.string('position')
    t.list.field('CmStaffGeneral', {
      type: 'CmStaffGeneral',
      args: {
        where: 'CmStaffGeneralWhereInput',
        orderBy: 'CmStaffGeneralOrderByInput',
        cursor: 'CmStaffGeneralWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmStaffGeneralScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmStaffGeneral
      },
    })
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})
