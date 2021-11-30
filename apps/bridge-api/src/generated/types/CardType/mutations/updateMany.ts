import { mutationField, nonNull } from 'nexus'

export const CardTypeUpdateManyMutation = mutationField('updateManyCardType', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('CardTypeUpdateManyMutationInput'),
    where: 'CardTypeWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.cardType.updateMany(args as any)
  },
})
