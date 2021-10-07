import { queryField, nonNull, list } from 'nexus'

export const CompanyDepartmentFindCountQuery = queryField(
  'findManyCompanyDepartmentCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CompanyDepartmentWhereInput',
      orderBy: list('CompanyDepartmentOrderByWithRelationInput'),
      cursor: 'CompanyDepartmentWhereUniqueInput',
      distinct: 'CompanyDepartmentScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyDepartment.count(args as any)
    },
  },
)
