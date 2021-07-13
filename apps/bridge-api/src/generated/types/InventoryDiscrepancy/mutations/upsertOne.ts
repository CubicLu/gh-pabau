import { mutationField, nonNull } from 'nexus'

export const InventoryDiscrepancyUpsertOneMutation = mutationField(
  'upsertOneInventoryDiscrepancy',
  {
    type: nonNull('InventoryDiscrepancy'),
    args: {
      where: nonNull('InventoryDiscrepancyWhereUniqueInput'),
      create: nonNull('InventoryDiscrepancyCreateInput'),
      update: nonNull('InventoryDiscrepancyUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.inventoryDiscrepancy.upsert({
        ...args,
        ...select,
      })
    },
  },
)
