import { mutationField, nonNull } from 'nexus'

export const FavoriteReportUpsertOneMutation = mutationField(
  'upsertOneFavoriteReport',
  {
    type: nonNull('FavoriteReport'),
    args: {
      where: nonNull('FavoriteReportWhereUniqueInput'),
      create: nonNull('FavoriteReportCreateInput'),
      update: nonNull('FavoriteReportUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.favoriteReport.upsert({
        ...args,
        ...select,
      })
    },
  },
)
