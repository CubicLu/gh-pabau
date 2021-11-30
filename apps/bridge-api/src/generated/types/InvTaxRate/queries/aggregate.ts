import { queryField, list } from 'nexus'

export const InvTaxRateAggregateQuery = queryField('aggregateInvTaxRate', {
  type: 'AggregateInvTaxRate',
  args: {
    where: 'InvTaxRateWhereInput',
    orderBy: list('InvTaxRateOrderByWithRelationInput'),
    cursor: 'InvTaxRateWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invTaxRate.aggregate({ ...args, ...select }) as any
  },
})
