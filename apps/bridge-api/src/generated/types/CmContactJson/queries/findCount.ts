import { queryField, nonNull, list } from 'nexus'

export const CmContactJsonFindCountQuery = queryField(
  'findManyCmContactJsonCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmContactJsonWhereInput',
      orderBy: list('CmContactJsonOrderByWithRelationInput'),
      cursor: 'CmContactJsonWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmContactJsonScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmContactJson.count(args as any)
    },
  },
)
