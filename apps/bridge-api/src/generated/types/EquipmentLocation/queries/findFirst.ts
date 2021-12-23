import { queryField, list } from 'nexus'

export const EquipmentLocationFindFirstQuery = queryField(
  'findFirstEquipmentLocation',
  {
    type: 'EquipmentLocation',
    args: {
      where: 'EquipmentLocationWhereInput',
      orderBy: list('EquipmentLocationOrderByWithRelationInput'),
      cursor: 'EquipmentLocationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('EquipmentLocationScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.equipmentLocation.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
