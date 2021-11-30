import { queryField, nonNull, list } from 'nexus'

export const TaxFindCountQuery = queryField('findManyTaxCount', {
  type: nonNull('Int'),
  args: {
    where: 'TaxWhereInput',
    orderBy: list('TaxOrderByWithRelationInput'),
    cursor: 'TaxWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('TaxScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.tax.count(args as any)
  },
})
