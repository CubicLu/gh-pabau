import { mutationField, nonNull } from 'nexus'

export const FavoriteReportUpdateManyMutation = mutationField(
  'updateManyFavoriteReport',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('FavoriteReportUpdateManyMutationInput'),
      where: 'FavoriteReportWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.favoriteReport.updateMany(args as any)
    },
  },
)
