import { mutationField, nonNull } from 'nexus'

export const EquipmentLocationUpsertOneMutation = mutationField(
  'upsertOneEquipmentLocation',
  {
    type: nonNull('EquipmentLocation'),
    args: {
      where: nonNull('EquipmentLocationWhereUniqueInput'),
      create: nonNull('EquipmentLocationCreateInput'),
      update: nonNull('EquipmentLocationUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.equipmentLocation.upsert({
        ...args,
        ...select,
      })
    },
  },
)
