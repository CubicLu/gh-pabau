import { queryField, nonNull, list } from 'nexus'

export const BookitProGeneralFindManyQuery = queryField(
  'findManyBookitProGeneral',
  {
    type: nonNull(list(nonNull('BookitProGeneral'))),
    args: {
      where: 'BookitProGeneralWhereInput',
      orderBy: list('BookitProGeneralOrderByInput'),
      cursor: 'BookitProGeneralWhereUniqueInput',
      distinct: 'BookitProGeneralScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookitProGeneral.findMany({
        ...args,
        ...select,
      })
    },
  },
)
