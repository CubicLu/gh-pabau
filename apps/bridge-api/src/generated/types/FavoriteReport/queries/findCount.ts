import { queryField, nonNull, list } from 'nexus'

export const FavoriteReportFindCountQuery = queryField(
  'findManyFavoriteReportCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'FavoriteReportWhereInput',
      orderBy: list('FavoriteReportOrderByWithRelationInput'),
      cursor: 'FavoriteReportWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('FavoriteReportScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.favoriteReport.count(args as any)
    },
  },
)
