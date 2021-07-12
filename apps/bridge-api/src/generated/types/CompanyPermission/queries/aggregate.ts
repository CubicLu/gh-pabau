import { queryField, list } from 'nexus'

export const CompanyPermissionAggregateQuery = queryField(
  'aggregateCompanyPermission',
  {
    type: 'AggregateCompanyPermission',
    args: {
      where: 'CompanyPermissionWhereInput',
      orderBy: list('CompanyPermissionOrderByInput'),
      cursor: 'CompanyPermissionWhereUniqueInput',
      distinct: 'CompanyPermissionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyPermission.aggregate({ ...args, ...select }) as any
    },
  },
)