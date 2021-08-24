import { queryField, nonNull } from 'nexus'

export const CompanyDepartmentFindUniqueQuery = queryField(
  'findUniqueCompanyDepartment',
  {
    type: 'CompanyDepartment',
    args: {
      where: nonNull('CompanyDepartmentWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.companyDepartment.findUnique({
        where,
        ...select,
      })
    },
  },
)
