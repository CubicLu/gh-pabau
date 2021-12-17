import { queryField, nonNull, list } from 'nexus'

export const CurrencyFindCountQuery = queryField('findManyCurrencyCount', {
  type: nonNull('Int'),
  args: {
    where: 'CurrencyWhereInput',
    orderBy: list('CurrencyOrderByWithRelationInput'),
    cursor: 'CurrencyWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CurrencyScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.currency.count(args as any)
  },
})
