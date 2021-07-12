import { queryField, list } from 'nexus'

export const PointOfSaleSettingFindFirstQuery = queryField(
  'findFirstPointOfSaleSetting',
  {
    type: 'PointOfSaleSetting',
    args: {
      where: 'PointOfSaleSettingWhereInput',
      orderBy: list('PointOfSaleSettingOrderByInput'),
      cursor: 'PointOfSaleSettingWhereUniqueInput',
      distinct: 'PointOfSaleSettingScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.pointOfSaleSetting.findFirst({
        ...args,
        ...select,
      })
    },
  },
)