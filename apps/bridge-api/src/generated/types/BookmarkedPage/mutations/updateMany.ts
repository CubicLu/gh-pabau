import { mutationField, nonNull } from 'nexus'

export const BookmarkedPageUpdateManyMutation = mutationField(
  'updateManyBookmarkedPage',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('BookmarkedPageUpdateManyMutationInput'),
      where: 'BookmarkedPageWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.bookmarkedPage.updateMany(args as any)
    },
  },
)
