import { queryField, list } from 'nexus'

export const CmContactTravelFindFirstQuery = queryField(
  'findFirstCmContactTravel',
  {
    type: 'CmContactTravel',
    args: {
      where: 'CmContactTravelWhereInput',
      orderBy: list('CmContactTravelOrderByWithRelationInput'),
      cursor: 'CmContactTravelWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmContactTravelScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactTravel.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
