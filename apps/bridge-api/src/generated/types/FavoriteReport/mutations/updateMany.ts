import { mutationField, nonNull } from 'nexus'

export const FavoriteReportUpdateManyMutation = mutationField(
  'updateManyFavoriteReport',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'FavoriteReportWhereInput',
      data: nonNull('FavoriteReportUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.favoriteReport.updateMany(args as any)
    },
  },
)
