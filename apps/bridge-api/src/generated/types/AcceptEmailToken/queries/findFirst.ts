import { queryField, list } from 'nexus'

export const AcceptEmailTokenFindFirstQuery = queryField(
  'findFirstAcceptEmailToken',
  {
    type: 'AcceptEmailToken',
    args: {
      where: 'AcceptEmailTokenWhereInput',
      orderBy: list('AcceptEmailTokenOrderByWithRelationInput'),
      cursor: 'AcceptEmailTokenWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AcceptEmailTokenScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.acceptEmailToken.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
