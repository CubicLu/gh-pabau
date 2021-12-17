import { queryField, list } from 'nexus'

export const CurrencyAggregateQuery = queryField('aggregateCurrency', {
  type: 'AggregateCurrency',
  args: {
    where: 'CurrencyWhereInput',
    orderBy: list('CurrencyOrderByWithRelationInput'),
    cursor: 'CurrencyWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.currency.aggregate({ ...args, ...select }) as any
  },
})
