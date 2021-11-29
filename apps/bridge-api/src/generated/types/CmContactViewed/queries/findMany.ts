import { queryField, nonNull, list } from 'nexus'

export const CmContactViewedFindManyQuery = queryField(
  'findManyCmContactViewed',
  {
    type: nonNull(list(nonNull('CmContactViewed'))),
    args: {
      where: 'CmContactViewedWhereInput',
      orderBy: list('CmContactViewedOrderByWithRelationInput'),
      cursor: 'CmContactViewedWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmContactViewedScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactViewed.findMany({
        ...args,
        ...select,
      })
    },
  },
)
