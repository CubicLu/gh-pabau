import { queryField, nonNull, list } from 'nexus'

export const AcceptEmailTokenFindManyQuery = queryField(
  'findManyAcceptEmailToken',
  {
    type: nonNull(list(nonNull('AcceptEmailToken'))),
    args: {
      where: 'AcceptEmailTokenWhereInput',
      orderBy: list('AcceptEmailTokenOrderByWithRelationInput'),
      cursor: 'AcceptEmailTokenWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AcceptEmailTokenScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.acceptEmailToken.findMany({
        ...args,
        ...select,
      })
    },
  },
)
