import { mutationField, nonNull } from 'nexus'

export const InventoryCountDeleteOneMutation = mutationField(
  'deleteOneInventoryCount',
  {
    type: 'InventoryCount',
    args: {
      where: nonNull('InventoryCountWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.inventoryCount.delete({
        where,
        ...select,
      })
    },
  },
)
