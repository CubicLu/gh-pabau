import { queryField, nonNull, list } from 'nexus'

export const EquipmentLocationFindCountQuery = queryField(
  'findManyEquipmentLocationCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'EquipmentLocationWhereInput',
      orderBy: list('EquipmentLocationOrderByWithRelationInput'),
      cursor: 'EquipmentLocationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('EquipmentLocationScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.equipmentLocation.count(args as any)
    },
  },
)
