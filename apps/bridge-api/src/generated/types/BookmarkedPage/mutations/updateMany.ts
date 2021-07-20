import { mutationField, nonNull } from 'nexus'

export const BookmarkedPageUpdateManyMutation = mutationField(
  'updateManyBookmarkedPage',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'BookmarkedPageWhereInput',
      data: nonNull('BookmarkedPageUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.bookmarkedPage.updateMany(args as any)
    },
  },
)
