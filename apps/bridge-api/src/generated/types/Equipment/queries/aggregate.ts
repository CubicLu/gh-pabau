import { queryField, list } from 'nexus'

export const EquipmentAggregateQuery = queryField('aggregateEquipment', {
  type: 'AggregateEquipment',
  args: {
    where: 'EquipmentWhereInput',
    orderBy: list('EquipmentOrderByWithRelationInput'),
    cursor: 'EquipmentWhereUniqueInput',
    distinct: 'EquipmentScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.equipment.aggregate({ ...args, ...select }) as any
  },
})
