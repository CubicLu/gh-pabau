import { queryField, nonNull, list } from 'nexus'

export const FavoriteReportFindManyQuery = queryField(
  'findManyFavoriteReport',
  {
    type: nonNull(list(nonNull('FavoriteReport'))),
    args: {
      where: 'FavoriteReportWhereInput',
      orderBy: list('FavoriteReportOrderByInput'),
      cursor: 'FavoriteReportWhereUniqueInput',
      distinct: 'FavoriteReportScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.favoriteReport.findMany({
        ...args,
        ...select,
      })
    },
  },
)
