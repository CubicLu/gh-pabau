import { queryField, nonNull, list } from 'nexus'

export const ServiceEquipmentFindManyQuery = queryField(
  'findManyServiceEquipment',
  {
    type: nonNull(list(nonNull('ServiceEquipment'))),
    args: {
      where: 'ServiceEquipmentWhereInput',
      orderBy: list('ServiceEquipmentOrderByWithRelationInput'),
      cursor: 'ServiceEquipmentWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ServiceEquipmentScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceEquipment.findMany({
        ...args,
        ...select,
      })
    },
  },
)
