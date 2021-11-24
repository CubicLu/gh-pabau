import { mutationField, nonNull } from 'nexus'

export const EquipmentUpdateManyMutation = mutationField(
  'updateManyEquipment',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'EquipmentWhereInput',
      data: nonNull('EquipmentUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.equipment.updateMany(args as any)
    },
  },
)
