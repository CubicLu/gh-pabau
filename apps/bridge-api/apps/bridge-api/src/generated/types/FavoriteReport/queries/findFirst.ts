import { queryField, list } from 'nexus'

export const FavoriteReportFindFirstQuery = queryField(
  'findFirstFavoriteReport',
  {
    type: 'FavoriteReport',
    args: {
      where: 'FavoriteReportWhereInput',
      orderBy: list('FavoriteReportOrderByWithRelationInput'),
      cursor: 'FavoriteReportWhereUniqueInput',
      distinct: 'FavoriteReportScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.favoriteReport.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
