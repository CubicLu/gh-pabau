import { queryField, list } from 'nexus'

export const EquipmentAggregateQuery = queryField('aggregateEquipment', {
  type: 'AggregateEquipment',
  args: {
    where: 'EquipmentWhereInput',
    orderBy: list('EquipmentOrderByWithRelationInput'),
    cursor: 'EquipmentWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.equipment.aggregate({ ...args, ...select }) as any
  },
})
