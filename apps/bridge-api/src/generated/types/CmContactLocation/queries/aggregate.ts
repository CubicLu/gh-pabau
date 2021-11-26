import { queryField, list } from 'nexus'

export const CmContactLocationAggregateQuery = queryField(
  'aggregateCmContactLocation',
  {
    type: 'AggregateCmContactLocation',
    args: {
      where: 'CmContactLocationWhereInput',
      orderBy: list('CmContactLocationOrderByWithRelationInput'),
      cursor: 'CmContactLocationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactLocation.aggregate({ ...args, ...select }) as any
    },
  },
)
