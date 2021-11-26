import { queryField, list } from 'nexus'

export const CmContactCustomAggregateQuery = queryField(
  'aggregateCmContactCustom',
  {
    type: 'AggregateCmContactCustom',
    args: {
      where: 'CmContactCustomWhereInput',
      orderBy: list('CmContactCustomOrderByWithRelationInput'),
      cursor: 'CmContactCustomWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactCustom.aggregate({ ...args, ...select }) as any
    },
  },
)
