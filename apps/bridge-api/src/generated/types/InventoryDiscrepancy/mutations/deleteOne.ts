import { mutationField, nonNull } from 'nexus'

export const InventoryDiscrepancyDeleteOneMutation = mutationField(
  'deleteOneInventoryDiscrepancy',
  {
    type: 'InventoryDiscrepancy',
    args: {
      where: nonNull('InventoryDiscrepancyWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.inventoryDiscrepancy.delete({
        where,
        ...select,
      })
    },
  },
)
