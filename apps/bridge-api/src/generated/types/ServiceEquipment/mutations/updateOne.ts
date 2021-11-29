import { mutationField, nonNull } from 'nexus'

export const ServiceEquipmentUpdateOneMutation = mutationField(
  'updateOneServiceEquipment',
  {
    type: nonNull('ServiceEquipment'),
    args: {
      data: nonNull('ServiceEquipmentUpdateInput'),
      where: nonNull('ServiceEquipmentWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.serviceEquipment.update({
        where,
        data,
        ...select,
      })
    },
  },
)
