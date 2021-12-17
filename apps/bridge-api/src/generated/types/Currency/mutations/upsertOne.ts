import { mutationField, nonNull } from 'nexus'

export const CurrencyUpsertOneMutation = mutationField('upsertOneCurrency', {
  type: nonNull('Currency'),
  args: {
    where: nonNull('CurrencyWhereUniqueInput'),
    create: nonNull('CurrencyCreateInput'),
    update: nonNull('CurrencyUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.currency.upsert({
      ...args,
      ...select,
    })
  },
})
