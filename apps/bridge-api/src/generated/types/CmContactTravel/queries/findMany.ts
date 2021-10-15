import { queryField, nonNull, list } from 'nexus'

export const CmContactTravelFindManyQuery = queryField(
  'findManyCmContactTravel',
  {
    type: nonNull(list(nonNull('CmContactTravel'))),
    args: {
      where: 'CmContactTravelWhereInput',
      orderBy: list('CmContactTravelOrderByInput'),
      cursor: 'CmContactTravelWhereUniqueInput',
      distinct: 'CmContactTravelScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactTravel.findMany({
        ...args,
        ...select,
      })
    },
  },
)
