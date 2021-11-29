import { queryField, list } from 'nexus'

export const SmsSenderAggregateQuery = queryField('aggregateSmsSender', {
  type: 'AggregateSmsSender',
  args: {
    where: 'SmsSenderWhereInput',
    orderBy: list('SmsSenderOrderByWithRelationInput'),
    cursor: 'SmsSenderWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.smsSender.aggregate({ ...args, ...select }) as any
  },
})
