import { queryField, list } from 'nexus'

export const FavoriteReportFindFirstQuery = queryField(
  'findFirstFavoriteReport',
  {
    type: 'FavoriteReport',
    args: {
      where: 'FavoriteReportWhereInput',
      orderBy: list('FavoriteReportOrderByWithRelationInput'),
      cursor: 'FavoriteReportWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('FavoriteReportScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.favoriteReport.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
