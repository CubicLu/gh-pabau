import { queryField, list } from 'nexus'

export const AcceptEmailTokenFindFirstQuery = queryField(
  'findFirstAcceptEmailToken',
  {
    type: 'AcceptEmailToken',
    args: {
      where: 'AcceptEmailTokenWhereInput',
      orderBy: list('AcceptEmailTokenOrderByWithRelationInput'),
      cursor: 'AcceptEmailTokenWhereUniqueInput',
      distinct: 'AcceptEmailTokenScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.acceptEmailToken.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
