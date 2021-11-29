import { mutationField, nonNull } from 'nexus'

export const ServiceEquipmentUpdateManyMutation = mutationField(
  'updateManyServiceEquipment',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'ServiceEquipmentWhereInput',
      data: nonNull('ServiceEquipmentUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.serviceEquipment.updateMany(args as any)
    },
  },
)
