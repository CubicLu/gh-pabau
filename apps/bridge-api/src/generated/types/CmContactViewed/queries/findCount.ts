import { queryField, nonNull, list } from 'nexus'

export const CmContactViewedFindCountQuery = queryField(
  'findManyCmContactViewedCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmContactViewedWhereInput',
      orderBy: list('CmContactViewedOrderByWithRelationInput'),
      cursor: 'CmContactViewedWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmContactViewedScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmContactViewed.count(args as any)
    },
  },
)
