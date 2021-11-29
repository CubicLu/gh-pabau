import { queryField, list } from 'nexus'

export const CmAuthorizationFindFirstQuery = queryField(
  'findFirstCmAuthorization',
  {
    type: 'CmAuthorization',
    args: {
      where: 'CmAuthorizationWhereInput',
      orderBy: list('CmAuthorizationOrderByWithRelationInput'),
      cursor: 'CmAuthorizationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmAuthorizationScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmAuthorization.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
