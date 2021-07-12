import { queryField, nonNull, list } from 'nexus'

export const FavoriteReportFindCountQuery = queryField(
  'findManyFavoriteReportCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'FavoriteReportWhereInput',
      orderBy: list('FavoriteReportOrderByInput'),
      cursor: 'FavoriteReportWhereUniqueInput',
      distinct: 'FavoriteReportScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.favoriteReport.count(args as any)
    },
  },
)
