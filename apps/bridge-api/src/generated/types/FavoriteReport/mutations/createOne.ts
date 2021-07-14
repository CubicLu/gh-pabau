import { mutationField, nonNull } from 'nexus'

export const FavoriteReportCreateOneMutation = mutationField(
  'createOneFavoriteReport',
  {
    type: nonNull('FavoriteReport'),
    args: {
      data: nonNull('FavoriteReportCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.favoriteReport.create({
        data,
        ...select,
      })
    },
  },
)
