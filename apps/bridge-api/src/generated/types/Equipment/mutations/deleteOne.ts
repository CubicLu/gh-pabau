import { mutationField, nonNull } from 'nexus'

export const EquipmentDeleteOneMutation = mutationField('deleteOneEquipment', {
  type: 'Equipment',
  args: {
    where: nonNull('EquipmentWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.equipment.delete({
      where,
      ...select,
    })
  },
})
