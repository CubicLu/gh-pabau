import { queryField, nonNull } from 'nexus'

export const FavoriteReportFindUniqueQuery = queryField(
  'findUniqueFavoriteReport',
  {
    type: 'FavoriteReport',
    args: {
      where: nonNull('FavoriteReportWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.favoriteReport.findUnique({
        where,
        ...select,
      })
    },
  },
)
