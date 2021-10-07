import { queryField, nonNull, list } from 'nexus'

export const CmAuthorizationFindManyQuery = queryField(
  'findManyCmAuthorization',
  {
    type: nonNull(list(nonNull('CmAuthorization'))),
    args: {
      where: 'CmAuthorizationWhereInput',
      orderBy: list('CmAuthorizationOrderByWithRelationInput'),
      cursor: 'CmAuthorizationWhereUniqueInput',
      distinct: 'CmAuthorizationScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmAuthorization.findMany({
        ...args,
        ...select,
      })
    },
  },
)
