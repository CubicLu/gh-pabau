import { mutationField, nonNull } from 'nexus'

export const EquipmentUpdateManyMutation = mutationField(
  'updateManyEquipment',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('EquipmentUpdateManyMutationInput'),
      where: 'EquipmentWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.equipment.updateMany(args as any)
    },
  },
)
