import { mutationField, nonNull } from 'nexus'

export const EquipmentLocationDeleteOneMutation = mutationField(
  'deleteOneEquipmentLocation',
  {
    type: 'EquipmentLocation',
    args: {
      where: nonNull('EquipmentLocationWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.equipmentLocation.delete({
        where,
        ...select,
      })
    },
  },
)
