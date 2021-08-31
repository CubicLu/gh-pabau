import { queryField, nonNull, list } from 'nexus'

export const AcceptEmailTokenFindManyQuery = queryField(
  'findManyAcceptEmailToken',
  {
    type: nonNull(list(nonNull('AcceptEmailToken'))),
    args: {
      where: 'AcceptEmailTokenWhereInput',
      orderBy: list('AcceptEmailTokenOrderByWithRelationInput'),
      cursor: 'AcceptEmailTokenWhereUniqueInput',
      distinct: 'AcceptEmailTokenScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.acceptEmailToken.findMany({
        ...args,
        ...select,
      })
    },
  },
)
