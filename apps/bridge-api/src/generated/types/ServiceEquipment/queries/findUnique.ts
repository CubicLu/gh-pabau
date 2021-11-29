import { queryField, nonNull } from 'nexus'

export const ServiceEquipmentFindUniqueQuery = queryField(
  'findUniqueServiceEquipment',
  {
    type: 'ServiceEquipment',
    args: {
      where: nonNull('ServiceEquipmentWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.serviceEquipment.findUnique({
        where,
        ...select,
      })
    },
  },
)
