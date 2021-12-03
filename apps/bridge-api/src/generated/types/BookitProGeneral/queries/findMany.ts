import { queryField, nonNull, list } from 'nexus'

export const BookitProGeneralFindManyQuery = queryField(
  'findManyBookitProGeneral',
  {
    type: nonNull(list(nonNull('BookitProGeneral'))),
    args: {
      where: 'BookitProGeneralWhereInput',
      orderBy: list('BookitProGeneralOrderByWithRelationInput'),
      cursor: 'BookitProGeneralWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('BookitProGeneralScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookitProGeneral.findMany({
        ...args,
        ...select,
      })
    },
  },
)
