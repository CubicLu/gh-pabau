import { mutationField, nonNull } from 'nexus'

export const ServiceEquipmentUpdateOneMutation = mutationField(
  'updateOneServiceEquipment',
  {
    type: nonNull('ServiceEquipment'),
    args: {
      where: nonNull('ServiceEquipmentWhereUniqueInput'),
      data: nonNull('ServiceEquipmentUpdateInput'),
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
