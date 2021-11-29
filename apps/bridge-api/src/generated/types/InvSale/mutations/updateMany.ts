import { mutationField, nonNull } from 'nexus'

export const InvSaleUpdateManyMutation = mutationField('updateManyInvSale', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('InvSaleUpdateManyMutationInput'),
    where: 'InvSaleWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.invSale.updateMany(args as any)
  },
})
