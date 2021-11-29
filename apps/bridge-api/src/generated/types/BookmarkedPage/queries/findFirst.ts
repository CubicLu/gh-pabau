import { queryField, list } from 'nexus'

export const BookmarkedPageFindFirstQuery = queryField(
  'findFirstBookmarkedPage',
  {
    type: 'BookmarkedPage',
    args: {
      where: 'BookmarkedPageWhereInput',
      orderBy: list('BookmarkedPageOrderByWithRelationInput'),
      cursor: 'BookmarkedPageWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('BookmarkedPageScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookmarkedPage.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
