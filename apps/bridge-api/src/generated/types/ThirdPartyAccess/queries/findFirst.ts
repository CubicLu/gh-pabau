import { queryField, list } from 'nexus'

export const ThirdPartyAccessFindFirstQuery = queryField(
  'findFirstThirdPartyAccess',
  {
    type: 'ThirdPartyAccess',
    args: {
      where: 'ThirdPartyAccessWhereInput',
      orderBy: list('ThirdPartyAccessOrderByWithRelationInput'),
      cursor: 'ThirdPartyAccessWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ThirdPartyAccessScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.thirdPartyAccess.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
