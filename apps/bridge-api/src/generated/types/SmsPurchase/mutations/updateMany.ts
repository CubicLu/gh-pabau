import { mutationField, nonNull } from 'nexus'

export const SmsPurchaseUpdateManyMutation = mutationField(
  'updateManySmsPurchase',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('SmsPurchaseUpdateManyMutationInput'),
      where: 'SmsPurchaseWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.smsPurchase.updateMany(args as any)
    },
  },
)
