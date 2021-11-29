import { queryField, nonNull, list } from 'nexus'

export const EquipmentFindManyQuery = queryField('findManyEquipment', {
  type: nonNull(list(nonNull('Equipment'))),
  args: {
    where: 'EquipmentWhereInput',
    orderBy: list('EquipmentOrderByWithRelationInput'),
    cursor: 'EquipmentWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('EquipmentScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.equipment.findMany({
      ...args,
      ...select,
    })
  },
})
