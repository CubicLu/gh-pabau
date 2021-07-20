import { queryField, nonNull } from 'nexus'

export const PointOfSaleSettingFindUniqueQuery = queryField(
  'findUniquePointOfSaleSetting',
  {
    type: 'PointOfSaleSetting',
    args: {
      where: nonNull('PointOfSaleSettingWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.pointOfSaleSetting.findUnique({
        where,
        ...select,
      })
    },
  },
)
