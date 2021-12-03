import { queryField, nonNull, list } from 'nexus'

export const FavoriteReportFindManyQuery = queryField(
  'findManyFavoriteReport',
  {
    type: nonNull(list(nonNull('FavoriteReport'))),
    args: {
      where: 'FavoriteReportWhereInput',
      orderBy: list('FavoriteReportOrderByWithRelationInput'),
      cursor: 'FavoriteReportWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('FavoriteReportScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.favoriteReport.findMany({
        ...args,
        ...select,
      })
    },
  },
)
