import { queryField, list } from 'nexus'

export const CmContactViewedAggregateQuery = queryField(
  'aggregateCmContactViewed',
  {
    type: 'AggregateCmContactViewed',
    args: {
      where: 'CmContactViewedWhereInput',
      orderBy: list('CmContactViewedOrderByInput'),
      cursor: 'CmContactViewedWhereUniqueInput',
      distinct: 'CmContactViewedScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactViewed.aggregate({ ...args, ...select }) as any
    },
  },
)
