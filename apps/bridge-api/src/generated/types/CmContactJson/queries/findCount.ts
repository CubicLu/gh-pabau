import { queryField, nonNull, list } from 'nexus'

export const CmContactJsonFindCountQuery = queryField(
  'findManyCmContactJsonCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmContactJsonWhereInput',
      orderBy: list('CmContactJsonOrderByInput'),
      cursor: 'CmContactJsonWhereUniqueInput',
      distinct: 'CmContactJsonScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmContactJson.count(args as any)
    },
  },
)
