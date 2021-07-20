import { queryField, nonNull } from 'nexus'

export const BookitProGeneralFindUniqueQuery = queryField(
  'findUniqueBookitProGeneral',
  {
    type: 'BookitProGeneral',
    args: {
      where: nonNull('BookitProGeneralWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.bookitProGeneral.findUnique({
        where,
        ...select,
      })
    },
  },
)
