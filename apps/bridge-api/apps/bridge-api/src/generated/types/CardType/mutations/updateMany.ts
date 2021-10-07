import { mutationField, nonNull } from 'nexus'

export const CardTypeUpdateManyMutation = mutationField('updateManyCardType', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'CardTypeWhereInput',
    data: nonNull('CardTypeUpdateManyMutationInput'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.cardType.updateMany(args as any)
  },
})
