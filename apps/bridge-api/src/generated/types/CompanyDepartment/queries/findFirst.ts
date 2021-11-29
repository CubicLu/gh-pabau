import { queryField, list } from 'nexus'

export const CompanyDepartmentFindFirstQuery = queryField(
  'findFirstCompanyDepartment',
  {
    type: 'CompanyDepartment',
    args: {
      where: 'CompanyDepartmentWhereInput',
      orderBy: list('CompanyDepartmentOrderByWithRelationInput'),
      cursor: 'CompanyDepartmentWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CompanyDepartmentScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyDepartment.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
