import { mutationField, nonNull } from 'nexus'

export const InventoryDiscrepancyUpdateOneMutation = mutationField(
  'updateOneInventoryDiscrepancy',
  {
    type: nonNull('InventoryDiscrepancy'),
    args: {
      data: nonNull('InventoryDiscrepancyUpdateInput'),
      where: nonNull('InventoryDiscrepancyWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.inventoryDiscrepancy.update({
        where,
        data,
        ...select,
      })
    },
  },
)
