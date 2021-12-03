import { mutationField, nonNull } from 'nexus'

export const FavoriteReportUpdateOneMutation = mutationField(
  'updateOneFavoriteReport',
  {
    type: nonNull('FavoriteReport'),
    args: {
      data: nonNull('FavoriteReportUpdateInput'),
      where: nonNull('FavoriteReportWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.favoriteReport.update({
        where,
        data,
        ...select,
      })
    },
  },
)
