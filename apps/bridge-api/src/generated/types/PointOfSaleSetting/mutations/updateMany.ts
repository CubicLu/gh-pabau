import { mutationField, nonNull } from 'nexus'

export const PointOfSaleSettingUpdateManyMutation = mutationField(
  'updateManyPointOfSaleSetting',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'PointOfSaleSettingWhereInput',
      data: nonNull('PointOfSaleSettingUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.pointOfSaleSetting.updateMany(args as any)
    },
  },
)
