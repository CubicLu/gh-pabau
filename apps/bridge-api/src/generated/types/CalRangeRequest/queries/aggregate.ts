import { queryField, list } from 'nexus'

export const CalRangeRequestAggregateQuery = queryField(
  'aggregateCalRangeRequest',
  {
    type: 'AggregateCalRangeRequest',
    args: {
      where: 'CalRangeRequestWhereInput',
      orderBy: list('CalRangeRequestOrderByInput'),
      cursor: 'CalRangeRequestWhereUniqueInput',
      distinct: 'CalRangeRequestScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.calRangeRequest.aggregate({ ...args, ...select }) as any
    },
  },
)
