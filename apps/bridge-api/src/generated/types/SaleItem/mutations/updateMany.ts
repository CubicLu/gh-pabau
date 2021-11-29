import { mutationField, nonNull } from 'nexus'

export const SaleItemUpdateManyMutation = mutationField('updateManySaleItem', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('SaleItemUpdateManyMutationInput'),
    where: 'SaleItemWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.saleItem.updateMany(args as any)
  },
})
