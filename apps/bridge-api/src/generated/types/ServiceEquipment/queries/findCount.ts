import { queryField, nonNull, list } from 'nexus'

export const ServiceEquipmentFindCountQuery = queryField(
  'findManyServiceEquipmentCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ServiceEquipmentWhereInput',
      orderBy: list('ServiceEquipmentOrderByWithRelationInput'),
      cursor: 'ServiceEquipmentWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ServiceEquipmentScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.serviceEquipment.count(args as any)
    },
  },
)
