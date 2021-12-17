import { mutationField, nonNull } from 'nexus'

export const CurrencyCreateOneMutation = mutationField('createOneCurrency', {
  type: nonNull('Currency'),
  args: {
    data: nonNull('CurrencyCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.currency.create({
      data,
      ...select,
    })
  },
})
