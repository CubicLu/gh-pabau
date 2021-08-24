import { mutationField, nonNull } from 'nexus'

export const FavoriteReportUpdateOneMutation = mutationField(
  'updateOneFavoriteReport',
  {
    type: nonNull('FavoriteReport'),
    args: {
      where: nonNull('FavoriteReportWhereUniqueInput'),
      data: nonNull('FavoriteReportUpdateInput'),
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
