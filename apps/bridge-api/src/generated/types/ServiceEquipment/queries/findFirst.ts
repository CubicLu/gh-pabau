import { queryField, list } from 'nexus'

export const ServiceEquipmentFindFirstQuery = queryField(
  'findFirstServiceEquipment',
  {
    type: 'ServiceEquipment',
    args: {
      where: 'ServiceEquipmentWhereInput',
      orderBy: list('ServiceEquipmentOrderByWithRelationInput'),
      cursor: 'ServiceEquipmentWhereUniqueInput',
      distinct: 'ServiceEquipmentScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceEquipment.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
