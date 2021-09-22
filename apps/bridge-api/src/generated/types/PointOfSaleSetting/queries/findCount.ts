import { queryField, nonNull, list } from 'nexus'

export const PointOfSaleSettingFindCountQuery = queryField(
  'findManyPointOfSaleSettingCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'PointOfSaleSettingWhereInput',
      orderBy: list('PointOfSaleSettingOrderByWithRelationInput'),
      cursor: 'PointOfSaleSettingWhereUniqueInput',
      distinct: 'PointOfSaleSettingScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.pointOfSaleSetting.count(args as any)
    },
  },
)
