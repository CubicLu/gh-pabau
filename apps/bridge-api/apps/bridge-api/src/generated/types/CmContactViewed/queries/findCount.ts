import { queryField, nonNull, list } from 'nexus'

export const CmContactViewedFindCountQuery = queryField(
  'findManyCmContactViewedCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmContactViewedWhereInput',
      orderBy: list('CmContactViewedOrderByWithRelationInput'),
      cursor: 'CmContactViewedWhereUniqueInput',
      distinct: 'CmContactViewedScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmContactViewed.count(args as any)
    },
  },
)
