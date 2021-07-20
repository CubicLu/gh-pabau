import { mutationField, nonNull } from 'nexus'

export const InventoryDiscrepancyUpdateManyMutation = mutationField(
  'updateManyInventoryDiscrepancy',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'InventoryDiscrepancyWhereInput',
      data: nonNull('InventoryDiscrepancyUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.inventoryDiscrepancy.updateMany(args as any)
    },
  },
)
