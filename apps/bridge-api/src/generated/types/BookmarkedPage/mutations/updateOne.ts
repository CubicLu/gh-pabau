import { mutationField, nonNull } from 'nexus'

export const BookmarkedPageUpdateOneMutation = mutationField(
  'updateOneBookmarkedPage',
  {
    type: nonNull('BookmarkedPage'),
    args: {
      data: nonNull('BookmarkedPageUpdateInput'),
      where: nonNull('BookmarkedPageWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.bookmarkedPage.update({
        where,
        data,
        ...select,
      })
    },
  },
)
