import { queryField, nonNull } from 'nexus'

export const CurrencyFindUniqueQuery = queryField('findUniqueCurrency', {
  type: 'Currency',
  args: {
    where: nonNull('CurrencyWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.currency.findUnique({
      where,
      ...select,
    })
  },
})
