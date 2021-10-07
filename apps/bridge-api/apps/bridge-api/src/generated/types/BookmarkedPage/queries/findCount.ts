import { queryField, nonNull, list } from 'nexus'

export const BookmarkedPageFindCountQuery = queryField(
  'findManyBookmarkedPageCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'BookmarkedPageWhereInput',
      orderBy: list('BookmarkedPageOrderByWithRelationInput'),
      cursor: 'BookmarkedPageWhereUniqueInput',
      distinct: 'BookmarkedPageScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.bookmarkedPage.count(args as any)
    },
  },
)
