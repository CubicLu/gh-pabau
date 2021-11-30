import { mutationField, nonNull } from 'nexus'

export const PointOfSaleSettingUpdateOneMutation = mutationField(
  'updateOnePointOfSaleSetting',
  {
    type: nonNull('PointOfSaleSetting'),
    args: {
      data: nonNull('PointOfSaleSettingUpdateInput'),
      where: nonNull('PointOfSaleSettingWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.pointOfSaleSetting.update({
        where,
        data,
        ...select,
      })
    },
  },
)
