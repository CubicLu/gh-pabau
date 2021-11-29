import { mutationField, nonNull } from 'nexus'

export const ServiceEquipmentUpdateManyMutation = mutationField(
  'updateManyServiceEquipment',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('ServiceEquipmentUpdateManyMutationInput'),
      where: 'ServiceEquipmentWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.serviceEquipment.updateMany(args as any)
    },
  },
)
