import { queryField, nonNull, list } from 'nexus'

export const TaxFindCountQuery = queryField('findManyTaxCount', {
  type: nonNull('Int'),
  args: {
    where: 'TaxWhereInput',
    orderBy: list('TaxOrderByInput'),
    cursor: 'TaxWhereUniqueInput',
    distinct: 'TaxScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.tax.count(args as any)
  },
})
