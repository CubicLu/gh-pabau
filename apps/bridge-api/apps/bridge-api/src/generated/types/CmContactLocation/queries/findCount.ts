import { queryField, nonNull, list } from 'nexus'

export const CmContactLocationFindCountQuery = queryField(
  'findManyCmContactLocationCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmContactLocationWhereInput',
      orderBy: list('CmContactLocationOrderByWithRelationInput'),
      cursor: 'CmContactLocationWhereUniqueInput',
      distinct: 'CmContactLocationScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmContactLocation.count(args as any)
    },
  },
)
