import { queryField, list } from 'nexus'

export const CompanyDepartmentFindFirstQuery = queryField(
  'findFirstCompanyDepartment',
  {
    type: 'CompanyDepartment',
    args: {
      where: 'CompanyDepartmentWhereInput',
      orderBy: list('CompanyDepartmentOrderByInput'),
      cursor: 'CompanyDepartmentWhereUniqueInput',
      distinct: 'CompanyDepartmentScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyDepartment.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
