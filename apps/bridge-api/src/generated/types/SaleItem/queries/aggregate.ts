import { queryField, list } from 'nexus'

export const SaleItemAggregateQuery = queryField('aggregateSaleItem', {
  type: 'AggregateSaleItem',
  args: {
    where: 'SaleItemWhereInput',
    orderBy: list('SaleItemOrderByWithRelationInput'),
    cursor: 'SaleItemWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.saleItem.aggregate({ ...args, ...select }) as any
  },
})
