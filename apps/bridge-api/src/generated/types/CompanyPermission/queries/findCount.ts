import { queryField, nonNull, list } from 'nexus'

export const CompanyPermissionFindCountQuery = queryField(
  'findManyCompanyPermissionCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CompanyPermissionWhereInput',
      orderBy: list('CompanyPermissionOrderByWithRelationInput'),
      cursor: 'CompanyPermissionWhereUniqueInput',
      distinct: 'CompanyPermissionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyPermission.count(args as any)
    },
  },
)
