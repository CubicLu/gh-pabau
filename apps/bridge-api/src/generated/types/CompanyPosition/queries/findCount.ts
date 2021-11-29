import { queryField, nonNull, list } from 'nexus'

export const CompanyPositionFindCountQuery = queryField(
  'findManyCompanyPositionCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CompanyPositionWhereInput',
      orderBy: list('CompanyPositionOrderByWithRelationInput'),
      cursor: 'CompanyPositionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CompanyPositionScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyPosition.count(args as any)
    },
  },
)
