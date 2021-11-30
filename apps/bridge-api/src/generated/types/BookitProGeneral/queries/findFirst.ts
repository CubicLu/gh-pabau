import { queryField, list } from 'nexus'

export const BookitProGeneralFindFirstQuery = queryField(
  'findFirstBookitProGeneral',
  {
    type: 'BookitProGeneral',
    args: {
      where: 'BookitProGeneralWhereInput',
      orderBy: list('BookitProGeneralOrderByWithRelationInput'),
      cursor: 'BookitProGeneralWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('BookitProGeneralScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookitProGeneral.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
