import { queryField, nonNull } from 'nexus'

export const AcceptEmailTokenFindUniqueQuery = queryField(
  'findUniqueAcceptEmailToken',
  {
    type: 'AcceptEmailToken',
    args: {
      where: nonNull('AcceptEmailTokenWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.acceptEmailToken.findUnique({
        where,
        ...select,
      })
    },
  },
)
