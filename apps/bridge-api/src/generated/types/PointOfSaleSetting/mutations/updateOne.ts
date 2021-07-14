import { mutationField, nonNull } from 'nexus'

export const PointOfSaleSettingUpdateOneMutation = mutationField(
  'updateOnePointOfSaleSetting',
  {
    type: nonNull('PointOfSaleSetting'),
    args: {
      where: nonNull('PointOfSaleSettingWhereUniqueInput'),
      data: nonNull('PointOfSaleSettingUpdateInput'),
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
