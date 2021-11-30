import { mutationField, nonNull } from 'nexus'

export const EquipmentUpsertOneMutation = mutationField('upsertOneEquipment', {
  type: nonNull('Equipment'),
  args: {
    where: nonNull('EquipmentWhereUniqueInput'),
    create: nonNull('EquipmentCreateInput'),
    update: nonNull('EquipmentUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.equipment.upsert({
      ...args,
      ...select,
    })
  },
})
