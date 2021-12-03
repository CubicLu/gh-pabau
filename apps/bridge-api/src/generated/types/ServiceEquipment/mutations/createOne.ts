import { mutationField, nonNull } from 'nexus'

export const ServiceEquipmentCreateOneMutation = mutationField(
  'createOneServiceEquipment',
  {
    type: nonNull('ServiceEquipment'),
    args: {
      data: nonNull('ServiceEquipmentCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.serviceEquipment.create({
        data,
        ...select,
      })
    },
  },
)
