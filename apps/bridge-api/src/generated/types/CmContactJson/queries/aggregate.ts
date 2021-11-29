import { queryField, list } from 'nexus'

export const CmContactJsonAggregateQuery = queryField(
  'aggregateCmContactJson',
  {
    type: 'AggregateCmContactJson',
    args: {
      where: 'CmContactJsonWhereInput',
      orderBy: list('CmContactJsonOrderByWithRelationInput'),
      cursor: 'CmContactJsonWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactJson.aggregate({ ...args, ...select }) as any
    },
  },
)
