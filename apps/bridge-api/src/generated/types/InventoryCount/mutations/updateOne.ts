import { mutationField, nonNull } from 'nexus'

export const InventoryCountUpdateOneMutation = mutationField(
  'updateOneInventoryCount',
  {
    type: nonNull('InventoryCount'),
    args: {
      data: nonNull('InventoryCountUpdateInput'),
      where: nonNull('InventoryCountWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.inventoryCount.update({
        where,
        data,
        ...select,
      })
    },
  },
)
