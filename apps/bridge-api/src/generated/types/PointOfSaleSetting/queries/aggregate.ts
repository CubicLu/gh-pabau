import { queryField, list } from 'nexus'

export const PointOfSaleSettingAggregateQuery = queryField(
  'aggregatePointOfSaleSetting',
  {
    type: 'AggregatePointOfSaleSetting',
    args: {
      where: 'PointOfSaleSettingWhereInput',
      orderBy: list('PointOfSaleSettingOrderByWithRelationInput'),
      cursor: 'PointOfSaleSettingWhereUniqueInput',
      distinct: 'PointOfSaleSettingScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.pointOfSaleSetting.aggregate({ ...args, ...select }) as any
    },
  },
)
