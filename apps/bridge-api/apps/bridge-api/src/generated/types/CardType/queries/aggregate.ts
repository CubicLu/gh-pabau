import { queryField, list } from 'nexus'

export const CardTypeAggregateQuery = queryField('aggregateCardType', {
  type: 'AggregateCardType',
  args: {
    where: 'CardTypeWhereInput',
    orderBy: list('CardTypeOrderByWithRelationInput'),
    cursor: 'CardTypeWhereUniqueInput',
    distinct: 'CardTypeScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cardType.aggregate({ ...args, ...select }) as any
  },
})
