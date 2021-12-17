import { mutationField, nonNull } from 'nexus'

export const CurrencyUpdateOneMutation = mutationField('updateOneCurrency', {
  type: nonNull('Currency'),
  args: {
    data: nonNull('CurrencyUpdateInput'),
    where: nonNull('CurrencyWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.currency.update({
      where,
      data,
      ...select,
    })
  },
})
