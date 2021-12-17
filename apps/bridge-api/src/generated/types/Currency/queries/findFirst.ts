import { queryField, list } from 'nexus'

export const CurrencyFindFirstQuery = queryField('findFirstCurrency', {
  type: 'Currency',
  args: {
    where: 'CurrencyWhereInput',
    orderBy: list('CurrencyOrderByWithRelationInput'),
    cursor: 'CurrencyWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CurrencyScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.currency.findFirst({
      ...args,
      ...select,
    })
  },
})
