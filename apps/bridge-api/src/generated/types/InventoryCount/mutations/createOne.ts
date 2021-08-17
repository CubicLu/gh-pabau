import { mutationField, nonNull } from 'nexus'

export const InventoryCountCreateOneMutation = mutationField(
  'createOneInventoryCount',
  {
    type: nonNull('InventoryCount'),
    args: {
      data: nonNull('InventoryCountCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.inventoryCount.create({
        data,
        ...select,
      })
    },
  },
)
