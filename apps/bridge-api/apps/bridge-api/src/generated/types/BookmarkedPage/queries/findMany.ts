import { queryField, nonNull, list } from 'nexus'

export const BookmarkedPageFindManyQuery = queryField(
  'findManyBookmarkedPage',
  {
    type: nonNull(list(nonNull('BookmarkedPage'))),
    args: {
      where: 'BookmarkedPageWhereInput',
      orderBy: list('BookmarkedPageOrderByWithRelationInput'),
      cursor: 'BookmarkedPageWhereUniqueInput',
      distinct: 'BookmarkedPageScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookmarkedPage.findMany({
        ...args,
        ...select,
      })
    },
  },
)
