import { queryField, list } from 'nexus'

export const ThirdPartyAccessFindFirstQuery = queryField(
  'findFirstThirdPartyAccess',
  {
    type: 'ThirdPartyAccess',
    args: {
      where: 'ThirdPartyAccessWhereInput',
      orderBy: list('ThirdPartyAccessOrderByInput'),
      cursor: 'ThirdPartyAccessWhereUniqueInput',
      distinct: 'ThirdPartyAccessScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.thirdPartyAccess.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
