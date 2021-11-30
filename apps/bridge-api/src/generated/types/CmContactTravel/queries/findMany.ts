import { queryField, nonNull, list } from 'nexus'

export const CmContactTravelFindManyQuery = queryField(
  'findManyCmContactTravel',
  {
    type: nonNull(list(nonNull('CmContactTravel'))),
    args: {
      where: 'CmContactTravelWhereInput',
      orderBy: list('CmContactTravelOrderByWithRelationInput'),
      cursor: 'CmContactTravelWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmContactTravelScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactTravel.findMany({
        ...args,
        ...select,
      })
    },
  },
)
