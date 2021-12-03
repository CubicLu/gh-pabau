import { queryField, nonNull, list } from 'nexus'

export const CmAuthorizationFindCountQuery = queryField(
  'findManyCmAuthorizationCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmAuthorizationWhereInput',
      orderBy: list('CmAuthorizationOrderByWithRelationInput'),
      cursor: 'CmAuthorizationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmAuthorizationScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmAuthorization.count(args as any)
    },
  },
)
