import { queryField, nonNull, list } from 'nexus'

export const TaxFindManyQuery = queryField('findManyTax', {
  type: nonNull(list(nonNull('Tax'))),
  args: {
    where: 'TaxWhereInput',
    orderBy: list('TaxOrderByWithRelationInput'),
    cursor: 'TaxWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('TaxScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.tax.findMany({
      ...args,
      ...select,
    })
  },
})
