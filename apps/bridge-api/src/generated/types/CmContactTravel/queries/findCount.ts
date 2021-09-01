import { queryField, nonNull, list } from 'nexus'

export const CmContactTravelFindCountQuery = queryField(
  'findManyCmContactTravelCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmContactTravelWhereInput',
      orderBy: list('CmContactTravelOrderByWithRelationInput'),
      cursor: 'CmContactTravelWhereUniqueInput',
      distinct: 'CmContactTravelScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmContactTravel.count(args as any)
    },
  },
)
