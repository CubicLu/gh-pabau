import { mutationField, nonNull } from 'nexus'

export const InventoryCountUpdateOneMutation = mutationField(
  'updateOneInventoryCount',
  {
    type: nonNull('InventoryCount'),
    args: {
      where: nonNull('InventoryCountWhereUniqueInput'),
      data: nonNull('InventoryCountUpdateInput'),
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
