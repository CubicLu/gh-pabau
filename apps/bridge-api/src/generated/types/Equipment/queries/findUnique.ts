import { queryField, nonNull } from 'nexus'

export const EquipmentFindUniqueQuery = queryField('findUniqueEquipment', {
  type: 'Equipment',
  args: {
    where: nonNull('EquipmentWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.equipment.findUnique({
      where,
      ...select,
    })
  },
})
