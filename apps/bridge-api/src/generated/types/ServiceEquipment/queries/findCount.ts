import { queryField, nonNull, list } from 'nexus'

export const ServiceEquipmentFindCountQuery = queryField(
  'findManyServiceEquipmentCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ServiceEquipmentWhereInput',
      orderBy: list('ServiceEquipmentOrderByWithRelationInput'),
      cursor: 'ServiceEquipmentWhereUniqueInput',
      distinct: 'ServiceEquipmentScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.serviceEquipment.count(args as any)
    },
  },
)
