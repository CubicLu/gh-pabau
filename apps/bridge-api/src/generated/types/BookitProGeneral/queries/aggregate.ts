import { queryField, list } from 'nexus'

export const BookitProGeneralAggregateQuery = queryField(
  'aggregateBookitProGeneral',
  {
    type: 'AggregateBookitProGeneral',
    args: {
      where: 'BookitProGeneralWhereInput',
      orderBy: list('BookitProGeneralOrderByInput'),
      cursor: 'BookitProGeneralWhereUniqueInput',
      distinct: 'BookitProGeneralScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookitProGeneral.aggregate({ ...args, ...select }) as any
    },
  },
)
