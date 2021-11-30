import { queryField, list } from 'nexus'

export const CmContactViewedAggregateQuery = queryField(
  'aggregateCmContactViewed',
  {
    type: 'AggregateCmContactViewed',
    args: {
      where: 'CmContactViewedWhereInput',
      orderBy: list('CmContactViewedOrderByWithRelationInput'),
      cursor: 'CmContactViewedWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactViewed.aggregate({ ...args, ...select }) as any
    },
  },
)
