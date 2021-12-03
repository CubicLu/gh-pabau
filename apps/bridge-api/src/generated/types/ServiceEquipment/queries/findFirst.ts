import { queryField, list } from 'nexus'

export const ServiceEquipmentFindFirstQuery = queryField(
  'findFirstServiceEquipment',
  {
    type: 'ServiceEquipment',
    args: {
      where: 'ServiceEquipmentWhereInput',
      orderBy: list('ServiceEquipmentOrderByWithRelationInput'),
      cursor: 'ServiceEquipmentWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ServiceEquipmentScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceEquipment.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
