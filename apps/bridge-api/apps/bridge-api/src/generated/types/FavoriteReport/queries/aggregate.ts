import { queryField, list } from 'nexus'

export const FavoriteReportAggregateQuery = queryField(
  'aggregateFavoriteReport',
  {
    type: 'AggregateFavoriteReport',
    args: {
      where: 'FavoriteReportWhereInput',
      orderBy: list('FavoriteReportOrderByWithRelationInput'),
      cursor: 'FavoriteReportWhereUniqueInput',
      distinct: 'FavoriteReportScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.favoriteReport.aggregate({ ...args, ...select }) as any
    },
  },
)
