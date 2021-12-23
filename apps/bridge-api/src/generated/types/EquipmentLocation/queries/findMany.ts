import { queryField, nonNull, list } from 'nexus'

export const EquipmentLocationFindManyQuery = queryField(
  'findManyEquipmentLocation',
  {
    type: nonNull(list(nonNull('EquipmentLocation'))),
    args: {
      where: 'EquipmentLocationWhereInput',
      orderBy: list('EquipmentLocationOrderByWithRelationInput'),
      cursor: 'EquipmentLocationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('EquipmentLocationScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.equipmentLocation.findMany({
        ...args,
        ...select,
      })
    },
  },
)
