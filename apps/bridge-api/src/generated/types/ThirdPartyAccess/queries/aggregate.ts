import { queryField, list } from 'nexus'

export const ThirdPartyAccessAggregateQuery = queryField(
  'aggregateThirdPartyAccess',
  {
    type: 'AggregateThirdPartyAccess',
    args: {
      where: 'ThirdPartyAccessWhereInput',
      orderBy: list('ThirdPartyAccessOrderByWithRelationInput'),
      cursor: 'ThirdPartyAccessWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.thirdPartyAccess.aggregate({ ...args, ...select }) as any
    },
  },
)
