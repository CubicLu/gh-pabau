import { queryField, nonNull, list } from 'nexus'

export const BookitProGeneralFindCountQuery = queryField(
  'findManyBookitProGeneralCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'BookitProGeneralWhereInput',
      orderBy: list('BookitProGeneralOrderByWithRelationInput'),
      cursor: 'BookitProGeneralWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('BookitProGeneralScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.bookitProGeneral.count(args as any)
    },
  },
)
