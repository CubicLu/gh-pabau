import { mutationField, nonNull } from 'nexus'

export const CheckinProductUpdateManyMutation = mutationField(
  'updateManyCheckinProduct',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CheckinProductUpdateManyMutationInput'),
      where: 'CheckinProductWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.checkinProduct.updateMany(args as any)
    },
  },
)
