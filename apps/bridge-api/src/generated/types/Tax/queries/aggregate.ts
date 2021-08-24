import { queryField, list } from 'nexus'

export const TaxAggregateQuery = queryField('aggregateTax', {
  type: 'AggregateTax',
  args: {
    where: 'TaxWhereInput',
    orderBy: list('TaxOrderByInput'),
    cursor: 'TaxWhereUniqueInput',
    distinct: 'TaxScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.tax.aggregate({ ...args, ...select }) as any
  },
})
