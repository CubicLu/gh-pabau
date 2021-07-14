import { mutationField, nonNull } from 'nexus'

export const InventoryDiscrepancyCreateOneMutation = mutationField(
  'createOneInventoryDiscrepancy',
  {
    type: nonNull('InventoryDiscrepancy'),
    args: {
      data: nonNull('InventoryDiscrepancyCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.inventoryDiscrepancy.create({
        data,
        ...select,
      })
    },
  },
)
