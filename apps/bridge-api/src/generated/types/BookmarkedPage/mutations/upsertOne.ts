import { mutationField, nonNull } from 'nexus'

export const BookmarkedPageUpsertOneMutation = mutationField(
  'upsertOneBookmarkedPage',
  {
    type: nonNull('BookmarkedPage'),
    args: {
      where: nonNull('BookmarkedPageWhereUniqueInput'),
      create: nonNull('BookmarkedPageCreateInput'),
      update: nonNull('BookmarkedPageUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookmarkedPage.upsert({
        ...args,
        ...select,
      })
    },
  },
)
