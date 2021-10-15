import { queryField, nonNull, list } from 'nexus'

export const AcceptEmailTokenFindCountQuery = queryField(
  'findManyAcceptEmailTokenCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'AcceptEmailTokenWhereInput',
      orderBy: list('AcceptEmailTokenOrderByInput'),
      cursor: 'AcceptEmailTokenWhereUniqueInput',
      distinct: 'AcceptEmailTokenScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.acceptEmailToken.count(args as any)
    },
  },
)
