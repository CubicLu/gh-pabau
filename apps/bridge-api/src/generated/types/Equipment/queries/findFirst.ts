import { queryField, list } from 'nexus'

export const EquipmentFindFirstQuery = queryField('findFirstEquipment', {
  type: 'Equipment',
  args: {
    where: 'EquipmentWhereInput',
    orderBy: list('EquipmentOrderByWithRelationInput'),
    cursor: 'EquipmentWhereUniqueInput',
    distinct: 'EquipmentScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.equipment.findFirst({
      ...args,
      ...select,
    })
  },
})
