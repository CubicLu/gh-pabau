import { queryField, list } from 'nexus'

export const TaxFindFirstQuery = queryField('findFirstTax', {
  type: 'Tax',
  args: {
    where: 'TaxWhereInput',
    orderBy: list('TaxOrderByWithRelationInput'),
    cursor: 'TaxWhereUniqueInput',
    distinct: 'TaxScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.tax.findFirst({
      ...args,
      ...select,
    })
  },
})
