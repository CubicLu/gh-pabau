import { queryField, list } from 'nexus'

export const CmContactTravelFindFirstQuery = queryField(
  'findFirstCmContactTravel',
  {
    type: 'CmContactTravel',
    args: {
      where: 'CmContactTravelWhereInput',
      orderBy: list('CmContactTravelOrderByWithRelationInput'),
      cursor: 'CmContactTravelWhereUniqueInput',
      distinct: 'CmContactTravelScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactTravel.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
