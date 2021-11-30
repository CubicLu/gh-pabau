import { queryField, nonNull, list } from 'nexus'

export const CmContactTravelFindCountQuery = queryField(
  'findManyCmContactTravelCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmContactTravelWhereInput',
      orderBy: list('CmContactTravelOrderByWithRelationInput'),
      cursor: 'CmContactTravelWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmContactTravelScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmContactTravel.count(args as any)
    },
  },
)
