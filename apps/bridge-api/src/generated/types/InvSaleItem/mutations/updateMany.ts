import { mutationField, nonNull } from 'nexus'

export const InvSaleItemUpdateManyMutation = mutationField(
  'updateManyInvSaleItem',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'InvSaleItemWhereInput',
      data: nonNull('InvSaleItemUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.invSaleItem.updateMany(args as any)
    },
  },
)
