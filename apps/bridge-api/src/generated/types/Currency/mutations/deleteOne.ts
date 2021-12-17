import { mutationField, nonNull } from 'nexus'

export const CurrencyDeleteOneMutation = mutationField('deleteOneCurrency', {
  type: 'Currency',
  args: {
    where: nonNull('CurrencyWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.currency.delete({
      where,
      ...select,
    })
  },
})
