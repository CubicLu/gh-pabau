import { mutationField, nonNull } from 'nexus'

export const InventoryDiscrepancyUpdateOneMutation = mutationField(
  'updateOneInventoryDiscrepancy',
  {
    type: nonNull('InventoryDiscrepancy'),
    args: {
      where: nonNull('InventoryDiscrepancyWhereUniqueInput'),
      data: nonNull('InventoryDiscrepancyUpdateInput'),
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
