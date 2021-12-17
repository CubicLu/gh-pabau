import { mutationField, nonNull } from 'nexus'

export const CurrencyUpdateManyMutation = mutationField('updateManyCurrency', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('CurrencyUpdateManyMutationInput'),
    where: 'CurrencyWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.currency.updateMany(args as any)
  },
})
