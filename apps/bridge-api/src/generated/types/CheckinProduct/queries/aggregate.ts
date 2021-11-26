import { queryField, list } from 'nexus'

export const CheckinProductAggregateQuery = queryField(
  'aggregateCheckinProduct',
  {
    type: 'AggregateCheckinProduct',
    args: {
      where: 'CheckinProductWhereInput',
      orderBy: list('CheckinProductOrderByWithRelationInput'),
      cursor: 'CheckinProductWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.checkinProduct.aggregate({ ...args, ...select }) as any
    },
  },
)
