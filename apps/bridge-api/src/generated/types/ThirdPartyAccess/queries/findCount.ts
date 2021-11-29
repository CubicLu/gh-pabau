import { queryField, nonNull, list } from 'nexus'

export const ThirdPartyAccessFindCountQuery = queryField(
  'findManyThirdPartyAccessCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ThirdPartyAccessWhereInput',
      orderBy: list('ThirdPartyAccessOrderByWithRelationInput'),
      cursor: 'ThirdPartyAccessWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ThirdPartyAccessScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.thirdPartyAccess.count(args as any)
    },
  },
)
