import { mutationField, nonNull } from 'nexus'

export const SmsPurchaseUpdateManyMutation = mutationField(
  'updateManySmsPurchase',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'SmsPurchaseWhereInput',
      data: nonNull('SmsPurchaseUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.smsPurchase.updateMany(args as any)
    },
  },
)
