import { queryField, list } from 'nexus'

export const BlockReasonAggregateQuery = queryField('aggregateBlockReason', {
  type: 'AggregateBlockReason',
  args: {
    where: 'BlockReasonWhereInput',
    orderBy: list('BlockReasonOrderByWithRelationInput'),
    cursor: 'BlockReasonWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.blockReason.aggregate({ ...args, ...select }) as any
  },
})
