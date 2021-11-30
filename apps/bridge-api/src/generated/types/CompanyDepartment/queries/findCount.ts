import { queryField, nonNull, list } from 'nexus'

export const CompanyDepartmentFindCountQuery = queryField(
  'findManyCompanyDepartmentCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CompanyDepartmentWhereInput',
      orderBy: list('CompanyDepartmentOrderByWithRelationInput'),
      cursor: 'CompanyDepartmentWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CompanyDepartmentScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyDepartment.count(args as any)
    },
  },
)
