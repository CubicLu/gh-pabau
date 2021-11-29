import { queryField, list } from 'nexus'

export const CmContactTravelAggregateQuery = queryField(
  'aggregateCmContactTravel',
  {
    type: 'AggregateCmContactTravel',
    args: {
      where: 'CmContactTravelWhereInput',
      orderBy: list('CmContactTravelOrderByWithRelationInput'),
      cursor: 'CmContactTravelWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactTravel.aggregate({ ...args, ...select }) as any
    },
  },
)
