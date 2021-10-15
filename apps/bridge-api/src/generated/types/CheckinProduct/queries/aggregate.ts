import { queryField, list } from 'nexus'

export const CheckinProductAggregateQuery = queryField(
  'aggregateCheckinProduct',
  {
    type: 'AggregateCheckinProduct',
    args: {
      where: 'CheckinProductWhereInput',
      orderBy: list('CheckinProductOrderByInput'),
      cursor: 'CheckinProductWhereUniqueInput',
      distinct: 'CheckinProductScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.checkinProduct.aggregate({ ...args, ...select }) as any
    },
  },
)
