import { queryField, list } from 'nexus'

export const BookmarkedPageAggregateQuery = queryField(
  'aggregateBookmarkedPage',
  {
    type: 'AggregateBookmarkedPage',
    args: {
      where: 'BookmarkedPageWhereInput',
      orderBy: list('BookmarkedPageOrderByInput'),
      cursor: 'BookmarkedPageWhereUniqueInput',
      distinct: 'BookmarkedPageScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookmarkedPage.aggregate({ ...args, ...select }) as any
    },
  },
)
