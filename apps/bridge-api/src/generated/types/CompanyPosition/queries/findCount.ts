import { queryField, nonNull, list } from 'nexus'

export const CompanyPositionFindCountQuery = queryField(
  'findManyCompanyPositionCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CompanyPositionWhereInput',
      orderBy: list('CompanyPositionOrderByInput'),
      cursor: 'CompanyPositionWhereUniqueInput',
      distinct: 'CompanyPositionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyPosition.count(args as any)
    },
  },
)
