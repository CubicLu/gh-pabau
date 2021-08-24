import { queryField, nonNull } from 'nexus'

export const BookmarkedPageFindUniqueQuery = queryField(
  'findUniqueBookmarkedPage',
  {
    type: 'BookmarkedPage',
    args: {
      where: nonNull('BookmarkedPageWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.bookmarkedPage.findUnique({
        where,
        ...select,
      })
    },
  },
)
