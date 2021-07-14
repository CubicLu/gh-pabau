import { queryField, nonNull, list } from 'nexus'

export const TaxFindManyQuery = queryField('findManyTax', {
  type: nonNull(list(nonNull('Tax'))),
  args: {
    where: 'TaxWhereInput',
    orderBy: list('TaxOrderByInput'),
    cursor: 'TaxWhereUniqueInput',
    distinct: 'TaxScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.tax.findMany({
      ...args,
      ...select,
    })
  },
})
