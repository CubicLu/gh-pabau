import { mutationField, nonNull } from 'nexus'

export const FavoriteReportDeleteOneMutation = mutationField(
  'deleteOneFavoriteReport',
  {
    type: 'FavoriteReport',
    args: {
      where: nonNull('FavoriteReportWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.favoriteReport.delete({
        where,
        ...select,
      })
    },
  },
)
