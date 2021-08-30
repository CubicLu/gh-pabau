import { mutationField, nonNull } from 'nexus'

export const BookmarkedPageDeleteOneMutation = mutationField(
  'deleteOneBookmarkedPage',
  {
    type: 'BookmarkedPage',
    args: {
      where: nonNull('BookmarkedPageWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.bookmarkedPage.delete({
        where,
        ...select,
      })
    },
  },
)
