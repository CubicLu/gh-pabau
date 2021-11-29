import { mutationField, nonNull } from 'nexus'

export const PointOfSaleSettingUpdateManyMutation = mutationField(
  'updateManyPointOfSaleSetting',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('PointOfSaleSettingUpdateManyMutationInput'),
      where: 'PointOfSaleSettingWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.pointOfSaleSetting.updateMany(args as any)
    },
  },
)
