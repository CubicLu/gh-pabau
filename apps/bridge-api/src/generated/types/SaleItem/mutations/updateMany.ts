import { mutationField, nonNull } from 'nexus'

export const SaleItemUpdateManyMutation = mutationField('updateManySaleItem', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'SaleItemWhereInput',
    data: nonNull('SaleItemUpdateManyMutationInput'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.saleItem.updateMany(args as any)
  },
})
