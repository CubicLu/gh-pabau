import { mutationField, nonNull } from 'nexus'

export const InvSaleUpdateManyMutation = mutationField('updateManyInvSale', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'InvSaleWhereInput',
    data: nonNull('InvSaleUpdateManyMutationInput'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.invSale.updateMany(args as any)
  },
})
