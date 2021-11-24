import { mutationField, nonNull } from 'nexus'

export const EquipmentUpdateOneMutation = mutationField('updateOneEquipment', {
  type: nonNull('Equipment'),
  args: {
    where: nonNull('EquipmentWhereUniqueInput'),
    data: nonNull('EquipmentUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.equipment.update({
      where,
      data,
      ...select,
    })
  },
})
