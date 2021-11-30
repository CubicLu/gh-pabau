import { queryField, list } from 'nexus'

export const TaxAggregateQuery = queryField('aggregateTax', {
  type: 'AggregateTax',
  args: {
    where: 'TaxWhereInput',
    orderBy: list('TaxOrderByWithRelationInput'),
    cursor: 'TaxWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.tax.aggregate({ ...args, ...select }) as any
  },
})
