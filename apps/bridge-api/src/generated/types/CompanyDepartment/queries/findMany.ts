import { queryField, nonNull, list } from 'nexus'

export const CompanyDepartmentFindManyQuery = queryField(
  'findManyCompanyDepartment',
  {
    type: nonNull(list(nonNull('CompanyDepartment'))),
    args: {
      where: 'CompanyDepartmentWhereInput',
      orderBy: list('CompanyDepartmentOrderByInput'),
      cursor: 'CompanyDepartmentWhereUniqueInput',
      distinct: 'CompanyDepartmentScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyDepartment.findMany({
        ...args,
        ...select,
      })
    },
  },
)
