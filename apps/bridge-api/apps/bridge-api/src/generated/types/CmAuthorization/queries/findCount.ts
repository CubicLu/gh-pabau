import { queryField, nonNull, list } from 'nexus'

export const CmAuthorizationFindCountQuery = queryField(
  'findManyCmAuthorizationCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmAuthorizationWhereInput',
      orderBy: list('CmAuthorizationOrderByWithRelationInput'),
      cursor: 'CmAuthorizationWhereUniqueInput',
      distinct: 'CmAuthorizationScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmAuthorization.count(args as any)
    },
  },
)
