import { queryField, list } from 'nexus'

export const SmsSenderAggregateQuery = queryField('aggregateSmsSender', {
  type: 'AggregateSmsSender',
  args: {
    where: 'SmsSenderWhereInput',
    orderBy: list('SmsSenderOrderByWithRelationInput'),
    cursor: 'SmsSenderWhereUniqueInput',
    distinct: 'SmsSenderScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.smsSender.aggregate({ ...args, ...select }) as any
  },
})
