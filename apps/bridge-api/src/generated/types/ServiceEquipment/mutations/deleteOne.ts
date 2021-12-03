import { mutationField, nonNull } from 'nexus'

export const ServiceEquipmentDeleteOneMutation = mutationField(
  'deleteOneServiceEquipment',
  {
    type: 'ServiceEquipment',
    args: {
      where: nonNull('ServiceEquipmentWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.serviceEquipment.delete({
        where,
        ...select,
      })
    },
  },
)
