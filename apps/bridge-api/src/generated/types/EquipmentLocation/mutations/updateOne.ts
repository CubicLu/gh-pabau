import { mutationField, nonNull } from 'nexus'

export const EquipmentLocationUpdateOneMutation = mutationField(
  'updateOneEquipmentLocation',
  {
    type: nonNull('EquipmentLocation'),
    args: {
      data: nonNull('EquipmentLocationUpdateInput'),
      where: nonNull('EquipmentLocationWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.equipmentLocation.update({
        where,
        data,
        ...select,
      })
    },
  },
)
