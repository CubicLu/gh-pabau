import { mutationField, nonNull } from 'nexus'

export const EquipmentLocationCreateOneMutation = mutationField(
  'createOneEquipmentLocation',
  {
    type: nonNull('EquipmentLocation'),
    args: {
      data: nonNull('EquipmentLocationCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.equipmentLocation.create({
        data,
        ...select,
      })
    },
  },
)
