import { queryField, nonNull, list } from 'nexus'

export const EquipmentFindCountQuery = queryField('findManyEquipmentCount', {
  type: nonNull('Int'),
  args: {
    where: 'EquipmentWhereInput',
    orderBy: list('EquipmentOrderByWithRelationInput'),
    cursor: 'EquipmentWhereUniqueInput',
    distinct: 'EquipmentScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.equipment.count(args as any)
  },
})
