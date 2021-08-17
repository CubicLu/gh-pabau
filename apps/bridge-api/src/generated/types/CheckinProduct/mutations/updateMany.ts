import { mutationField, nonNull } from 'nexus'

export const CheckinProductUpdateManyMutation = mutationField(
  'updateManyCheckinProduct',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CheckinProductWhereInput',
      data: nonNull('CheckinProductUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.checkinProduct.updateMany(args as any)
    },
  },
)
