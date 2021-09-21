import { queryField, list } from 'nexus'

export const BookitProGeneralFindFirstQuery = queryField(
  'findFirstBookitProGeneral',
  {
    type: 'BookitProGeneral',
    args: {
      where: 'BookitProGeneralWhereInput',
      orderBy: list('BookitProGeneralOrderByWithRelationInput'),
      cursor: 'BookitProGeneralWhereUniqueInput',
      distinct: 'BookitProGeneralScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookitProGeneral.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
