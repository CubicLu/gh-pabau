import { queryField, nonNull, list } from 'nexus'

export const CurrencyFindManyQuery = queryField('findManyCurrency', {
  type: nonNull(list(nonNull('Currency'))),
  args: {
    where: 'CurrencyWhereInput',
    orderBy: list('CurrencyOrderByWithRelationInput'),
    cursor: 'CurrencyWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CurrencyScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.currency.findMany({
      ...args,
      ...select,
    })
  },
})
