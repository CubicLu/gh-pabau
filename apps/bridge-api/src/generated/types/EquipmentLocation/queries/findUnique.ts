import { queryField, nonNull } from 'nexus'

export const EquipmentLocationFindUniqueQuery = queryField(
  'findUniqueEquipmentLocation',
  {
    type: 'EquipmentLocation',
    args: {
      where: nonNull('EquipmentLocationWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.equipmentLocation.findUnique({
        where,
        ...select,
      })
    },
  },
)
