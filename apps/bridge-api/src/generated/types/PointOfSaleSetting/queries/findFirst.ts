import { queryField, list } from 'nexus'

export const PointOfSaleSettingFindFirstQuery = queryField(
  'findFirstPointOfSaleSetting',
  {
    type: 'PointOfSaleSetting',
    args: {
      where: 'PointOfSaleSettingWhereInput',
      orderBy: list('PointOfSaleSettingOrderByWithRelationInput'),
      cursor: 'PointOfSaleSettingWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('PointOfSaleSettingScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.pointOfSaleSetting.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
