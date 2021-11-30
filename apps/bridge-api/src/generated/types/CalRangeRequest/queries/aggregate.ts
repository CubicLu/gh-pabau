import { queryField, list } from 'nexus'

export const CalRangeRequestAggregateQuery = queryField(
  'aggregateCalRangeRequest',
  {
    type: 'AggregateCalRangeRequest',
    args: {
      where: 'CalRangeRequestWhereInput',
      orderBy: list('CalRangeRequestOrderByWithRelationInput'),
      cursor: 'CalRangeRequestWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.calRangeRequest.aggregate({ ...args, ...select }) as any
    },
  },
)
