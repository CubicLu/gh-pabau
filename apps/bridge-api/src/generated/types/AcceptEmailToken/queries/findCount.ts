import { queryField, nonNull, list } from 'nexus'

export const AcceptEmailTokenFindCountQuery = queryField(
  'findManyAcceptEmailTokenCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'AcceptEmailTokenWhereInput',
      orderBy: list('AcceptEmailTokenOrderByWithRelationInput'),
      cursor: 'AcceptEmailTokenWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AcceptEmailTokenScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.acceptEmailToken.count(args as any)
    },
  },
)
