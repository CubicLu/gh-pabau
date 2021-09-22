import { queryField, nonNull, list } from 'nexus'

export const ThirdPartyAccessFindManyQuery = queryField(
  'findManyThirdPartyAccess',
  {
    type: nonNull(list(nonNull('ThirdPartyAccess'))),
    args: {
      where: 'ThirdPartyAccessWhereInput',
      orderBy: list('ThirdPartyAccessOrderByWithRelationInput'),
      cursor: 'ThirdPartyAccessWhereUniqueInput',
      distinct: 'ThirdPartyAccessScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.thirdPartyAccess.findMany({
        ...args,
        ...select,
      })
    },
  },
)
