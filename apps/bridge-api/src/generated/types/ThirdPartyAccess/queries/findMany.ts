import { queryField, nonNull, list } from 'nexus'

export const ThirdPartyAccessFindManyQuery = queryField(
  'findManyThirdPartyAccess',
  {
    type: nonNull(list(nonNull('ThirdPartyAccess'))),
    args: {
      where: 'ThirdPartyAccessWhereInput',
      orderBy: list('ThirdPartyAccessOrderByWithRelationInput'),
      cursor: 'ThirdPartyAccessWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ThirdPartyAccessScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.thirdPartyAccess.findMany({
        ...args,
        ...select,
      })
    },
  },
)
