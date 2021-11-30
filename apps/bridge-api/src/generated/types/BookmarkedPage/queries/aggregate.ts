import { queryField, list } from 'nexus'

export const BookmarkedPageAggregateQuery = queryField(
  'aggregateBookmarkedPage',
  {
    type: 'AggregateBookmarkedPage',
    args: {
      where: 'BookmarkedPageWhereInput',
      orderBy: list('BookmarkedPageOrderByWithRelationInput'),
      cursor: 'BookmarkedPageWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookmarkedPage.aggregate({ ...args, ...select }) as any
    },
  },
)
