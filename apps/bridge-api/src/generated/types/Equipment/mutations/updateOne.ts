import { mutationField, nonNull } from 'nexus'

export const EquipmentUpdateOneMutation = mutationField('updateOneEquipment', {
  type: nonNull('Equipment'),
  args: {
    data: nonNull('EquipmentUpdateInput'),
    where: nonNull('EquipmentWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.equipment.update({
      where,
      data,
      ...select,
    })
  },
})
