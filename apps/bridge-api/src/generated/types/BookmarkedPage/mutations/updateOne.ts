import { mutationField, nonNull } from 'nexus'

export const BookmarkedPageUpdateOneMutation = mutationField(
  'updateOneBookmarkedPage',
  {
    type: nonNull('BookmarkedPage'),
    args: {
      where: nonNull('BookmarkedPageWhereUniqueInput'),
      data: nonNull('BookmarkedPageUpdateInput'),
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
