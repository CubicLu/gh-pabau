import { mutationField, nonNull } from 'nexus'

export const InventoryCountUpsertOneMutation = mutationField(
  'upsertOneInventoryCount',
  {
    type: nonNull('InventoryCount'),
    args: {
      where: nonNull('InventoryCountWhereUniqueInput'),
      create: nonNull('InventoryCountCreateInput'),
      update: nonNull('InventoryCountUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.inventoryCount.upsert({
        ...args,
        ...select,
      })
    },
  },
)
