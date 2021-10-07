import { queryField, nonNull, list } from 'nexus'

export const BookitProGeneralFindCountQuery = queryField(
  'findManyBookitProGeneralCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'BookitProGeneralWhereInput',
      orderBy: list('BookitProGeneralOrderByWithRelationInput'),
      cursor: 'BookitProGeneralWhereUniqueInput',
      distinct: 'BookitProGeneralScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.bookitProGeneral.count(args as any)
    },
  },
)
