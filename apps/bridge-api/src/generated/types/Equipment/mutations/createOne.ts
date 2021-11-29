import { mutationField, nonNull } from 'nexus'

export const EquipmentCreateOneMutation = mutationField('createOneEquipment', {
  type: nonNull('Equipment'),
  args: {
    data: nonNull('EquipmentCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.equipment.create({
      data,
      ...select,
    })
  },
})
