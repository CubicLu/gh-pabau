import { mutationField, nonNull } from 'nexus'

export const InventoryDiscrepancyUpdateManyMutation = mutationField(
  'updateManyInventoryDiscrepancy',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('InventoryDiscrepancyUpdateManyMutationInput'),
      where: 'InventoryDiscrepancyWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.inventoryDiscrepancy.updateMany(args as any)
    },
  },
)
