import { mutationField, nonNull } from 'nexus'

export const PointOfSaleSettingUpsertOneMutation = mutationField(
  'upsertOnePointOfSaleSetting',
  {
    type: nonNull('PointOfSaleSetting'),
    args: {
      where: nonNull('PointOfSaleSettingWhereUniqueInput'),
      create: nonNull('PointOfSaleSettingCreateInput'),
      update: nonNull('PointOfSaleSettingUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.pointOfSaleSetting.upsert({
        ...args,
        ...select,
      })
    },
  },
)
