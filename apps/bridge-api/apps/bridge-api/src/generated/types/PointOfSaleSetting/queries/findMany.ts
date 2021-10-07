import { queryField, nonNull, list } from 'nexus'

export const PointOfSaleSettingFindManyQuery = queryField(
  'findManyPointOfSaleSetting',
  {
    type: nonNull(list(nonNull('PointOfSaleSetting'))),
    args: {
      where: 'PointOfSaleSettingWhereInput',
      orderBy: list('PointOfSaleSettingOrderByWithRelationInput'),
      cursor: 'PointOfSaleSettingWhereUniqueInput',
      distinct: 'PointOfSaleSettingScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.pointOfSaleSetting.findMany({
        ...args,
        ...select,
      })
    },
  },
)
