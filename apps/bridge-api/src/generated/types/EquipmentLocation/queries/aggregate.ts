import { queryField, list } from 'nexus'

export const EquipmentLocationAggregateQuery = queryField(
  'aggregateEquipmentLocation',
  {
    type: 'AggregateEquipmentLocation',
    args: {
      where: 'EquipmentLocationWhereInput',
      orderBy: list('EquipmentLocationOrderByWithRelationInput'),
      cursor: 'EquipmentLocationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.equipmentLocation.aggregate({ ...args, ...select }) as any
    },
  },
)
