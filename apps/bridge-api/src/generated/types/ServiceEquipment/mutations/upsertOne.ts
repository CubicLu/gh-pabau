import { mutationField, nonNull } from 'nexus'

export const ServiceEquipmentUpsertOneMutation = mutationField(
  'upsertOneServiceEquipment',
  {
    type: nonNull('ServiceEquipment'),
    args: {
      where: nonNull('ServiceEquipmentWhereUniqueInput'),
      create: nonNull('ServiceEquipmentCreateInput'),
      update: nonNull('ServiceEquipmentUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceEquipment.upsert({
        ...args,
        ...select,
      })
    },
  },
)
