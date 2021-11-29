import { queryField, list } from 'nexus'

export const EquipmentFindFirstQuery = queryField('findFirstEquipment', {
  type: 'Equipment',
  args: {
    where: 'EquipmentWhereInput',
    orderBy: list('EquipmentOrderByWithRelationInput'),
    cursor: 'EquipmentWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('EquipmentScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.equipment.findFirst({
      ...args,
      ...select,
    })
  },
})
